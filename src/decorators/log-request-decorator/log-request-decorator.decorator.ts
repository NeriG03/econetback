import { Request } from 'express';
import { DataSource, EntityManager } from 'typeorm';

export function LogRequest() {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const originalMethod = descriptor.value;
        descriptor.value = async function(...args: any[]) {
            const request: Request = args[0];
            const requestBody = request.body;
            const method = request.method;
            const ip = request.ip || request.socket.remoteAddress;
            
            const logInfo = {
                timestamp: new Date().toISOString(),
                endpoint: propertyKey,
                method,
                ip,
                requestBody
            };

            // For PUT/PATCH operations, log the existing data before update
            if ((method === 'PUT' || method === 'PATCH') && 'id' in request.params) {
                try {
                    // Get entity manager from the instance if available
                    const entityManager: EntityManager = this.manager || 
                                                      (this.dataSource as DataSource)?.manager ||
                                                      undefined;
                    
                    if (entityManager && this.repository) {
                        const entityId = request.params.id;
                        const existingData = await this.repository.findOneBy({ id: entityId });
                        
                        if (existingData) {
                            logInfo['existingData'] = existingData;
                            logInfo['changes'] = Object.keys(requestBody).reduce((acc, key) => {
                                if (existingData[key] !== requestBody[key]) {
                                    acc[key] = {
                                        from: existingData[key],
                                        to: requestBody[key]
                                    };
                                }
                                return acc;
                            }, {});
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
                
                // Log success response
                console.log('[Response]', JSON.stringify({
                    timestamp: new Date().toISOString(),
                    endpoint: propertyKey,
                    method,
                    ip,
                    status: 'success',
                    responseData: result
                }, null, 2));

                return result;
            } catch (error) {
                // Log error response
                console.error('[Error]', JSON.stringify({
                    timestamp: new Date().toISOString(),
                    endpoint: propertyKey,
                    method,
                    ip,
                    status: 'error',
                    error: {
                        message: error.message,
                        stack: error.stack
                    }
                }, null, 2));
                
                throw error; // Re-throw to maintain normal error handling
            }
        }
        return descriptor;
    }
}
