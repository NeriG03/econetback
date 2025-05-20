import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserActivitiesService } from './user-activities.service';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { UpdateUserActivityDto } from './dto/update-user-activity.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UserActivity } from './entities/user-activity.entity';

@ApiTags('user-activities')
@Controller('user-activities')
export class UserActivitiesController {
  constructor(private readonly userActivitiesService: UserActivitiesService) {}

  @ApiOperation({ summary: 'Crear una relación usuario-actividad' })
  @ApiBody({ type: CreateUserActivityDto })
  @ApiResponse({ status: 201, description: 'Relación creada exitosamente', type: UserActivity })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @Post()
  create(@Body() createUserActivityDto: CreateUserActivityDto) {
    return this.userActivitiesService.create(createUserActivityDto);
  }

  @ApiOperation({ summary: 'Obtener todas las relaciones usuario-actividad' })
  @ApiResponse({
    status: 200,
    description: 'Lista de relaciones usuario-actividad',
    type: [UserActivity],
  })
  @Get()
  findAll() {
    return this.userActivitiesService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una relación usuario-actividad por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la relación usuario-actividad', type: 'number' })
  @ApiResponse({ status: 200, description: 'Relación encontrada', type: UserActivity })
  @ApiResponse({ status: 404, description: 'Relación no encontrada' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userActivitiesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar una relación usuario-actividad' })
  @ApiParam({
    name: 'id',
    description: 'ID de la relación usuario-actividad a actualizar',
    type: 'number',
  })
  @ApiBody({ type: UpdateUserActivityDto })
  @ApiResponse({ status: 200, description: 'Relación actualizada', type: UserActivity })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Relación no encontrada' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserActivityDto: UpdateUserActivityDto) {
    return this.userActivitiesService.update(+id, updateUserActivityDto);
  }

  @ApiOperation({ summary: 'Eliminar una relación usuario-actividad' })
  @ApiParam({
    name: 'id',
    description: 'ID de la relación usuario-actividad a eliminar',
    type: 'number',
  })
  @ApiResponse({ status: 200, description: 'Relación eliminada' })
  @ApiResponse({ status: 404, description: 'Relación no encontrada' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userActivitiesService.remove(+id);
  }
}
