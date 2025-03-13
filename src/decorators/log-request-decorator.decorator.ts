import { Request } from 'express';
import { DataSource, EntityManager } from 'typeorm';

export function LogRequest() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      // Find the request object from the arguments
      const request: Request = args.find(arg => arg?.constructor?.name === 'IncomingMessage');
      if (!request) {
        console.error('[LogRequest Decorator] Request object not found in arguments');
        return originalMethod.apply(this, args);
      }

      const requestBody = request.body;
      const method = request.method;
      const ip = request.ip || request.socket?.remoteAddress;

      const logInfo = {
        timestamp: new Date().toISOString(),
        endpoint: propertyKey,
        method,
        ip,
        requestBody,
      };

      // For PUT/PATCH operations, log the existing data before update
      if ((method === 'PUT' || method === 'PATCH') && 'id' in request.params) {
        try {
          // Get entity manager from the instance if available
          const entityManager: EntityManager =
            this.manager || (this.dataSource as DataSource)?.manager || undefined;

          if (entityManager && this.repository) {
            const entityId = request.params.id;
            const existingData = await this.repository.findOneBy({ id: entityId });

            if (existingData) {
              // Format existing data to handle circular references
              const formattedExistingData = JSON.parse(JSON.stringify(existingData));
              logInfo['existingData'] = formattedExistingData;
              logInfo['changes'] = Object.keys(requestBody).reduce((acc, key) => {
                if (formattedExistingData[key] !== requestBody[key]) {
                  acc[key] = {
                    from: formattedExistingData[key],
                    to: requestBody[key],
                  };
                }
                return acc;
              }, {});
              logInfo['operation'] = method.toLowerCase();
              logInfo['entityId'] = entityId;
            }
          }
        } catch (error) {
          // Log error but don't block the request
          console.error('[LogRequest Decorator] Error fetching existing data:', error.message);
        }
      }

      // Log request details
      console.log('[Request]', JSON.stringify(logInfo, null, 2));

      try {
        // Execute the original method
        const result = await originalMethod.apply(this, args);

        // Format response data to handle circular references
        const formatResponseData = (data: any) => {
          try {
            return JSON.parse(JSON.stringify(data));
          } catch (err) {
            return String(data);
          }
        };

        // Log success response with detailed information
        const responseLog = {
          timestamp: new Date().toISOString(),
          endpoint: propertyKey,
          method,
          ip,
          status: 'success',
          responseData: formatResponseData(result),
        };

        // Add operation-specific details
        if (method === 'DELETE') {
          responseLog['operation'] = 'delete';
          responseLog['deletedId'] = request.params.id;
        } else if (method === 'PUT' || method === 'PATCH') {
          responseLog['operation'] = 'update';
          responseLog['updatedId'] = request.params.id;
        }

        console.log('[Response]', JSON.stringify(responseLog, null, 2));

        return result;
      } catch (error) {
        // Log error response
        console.error(
          '[Error]',
          JSON.stringify(
            {
              timestamp: new Date().toISOString(),
              endpoint: propertyKey,
              method,
              ip,
              status: 'error',
              error: {
                message: error.message,
                stack: error.stack,
              },
            },
            null,
            2,
          ),
        );

        throw error; // Re-throw to maintain normal error handling
      }
    };
    return descriptor;
  };
}
