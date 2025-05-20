import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ManualsService } from './manuals.service';
import { CreateManualDto } from './dto/create-manual.dto';
import { UpdateManualDto } from './dto/update-manual.dto';
import { LogRequest } from 'src/decorators/log-request-decorator.decorator';
import { Request } from 'express';
import { Manual } from './entities/manual.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('manuals')
@Controller('manuals')
export class ManualsController {
  constructor(private readonly manualsService: ManualsService) {}

  @ApiOperation({ summary: 'Crear un nuevo manual' })
  @ApiBody({ type: CreateManualDto })
  @ApiResponse({ status: 201, description: 'Manual creado exitosamente', type: Manual })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @Post()
  @LogRequest()
  create(@Req() req: Request, @Body() createManualDto: CreateManualDto): Promise<Manual> {
    return this.manualsService.create(createManualDto);
  }

  @ApiOperation({ summary: 'Obtener todos los manuales' })
  @ApiResponse({ status: 200, description: 'Lista de manuales', type: [Manual] })
  @Get()
  @LogRequest()
  findAll(@Req() req: Request): Promise<Manual[]> {
    return this.manualsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un manual por su ID' })
  @ApiParam({ name: 'id', description: 'ID del manual', type: 'number' })
  @ApiResponse({ status: 200, description: 'Manual encontrado', type: Manual })
  @ApiResponse({ status: 404, description: 'Manual no encontrado' })
  @Get(':id')
  @LogRequest()
  findOne(@Req() req: Request, @Param('id') id: string): Promise<Manual> {
    return this.manualsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar un manual' })
  @ApiParam({ name: 'id', description: 'ID del manual a actualizar', type: 'number' })
  @ApiBody({ type: UpdateManualDto })
  @ApiResponse({ status: 200, description: 'Manual actualizado', type: Manual })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Manual no encontrado' })
  @Patch(':id')
  @LogRequest()
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateManualDto: UpdateManualDto,
  ): Promise<Manual> {
    const manual = await this.manualsService.findOne(+id);
    await this.manualsService.update(+id, updateManualDto);
    return this.manualsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Eliminar un manual' })
  @ApiParam({ name: 'id', description: 'ID del manual a eliminar', type: 'number' })
  @ApiResponse({ status: 200, description: 'Manual eliminado', type: Manual })
  @ApiResponse({ status: 404, description: 'Manual no encontrado' })
  @Delete(':id')
  @LogRequest()
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Manual> {
    const manual = await this.manualsService.findOne(+id);
    await this.manualsService.remove(+id);
    return manual;
  }
}
