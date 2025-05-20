import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/auth-decorators/roles.decorator';
import { RolesUsuario } from 'src/enums/Roles-Usuarios.enum';
import { LogRequest } from 'src/decorators/log-request-decorator.decorator';
import { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Activity } from './entities/activity.entity';

@ApiTags('activities')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @ApiOperation({ summary: 'Crear una nueva actividad' })
  @ApiBody({ type: CreateActivityDto })
  @ApiResponse({ status: 201, description: 'Actividad creada exitosamente', type: Activity })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN, RolesUsuario.SUPER_USER)
  @Post()
  @LogRequest()
  create(@Req() req: Request, @Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @ApiOperation({ summary: 'Obtener todas las actividades' })
  @ApiResponse({ status: 200, description: 'Lista de actividades', type: [Activity] })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN, RolesUsuario.SUPER_USER)
  @Get()
  @LogRequest()
  findAll(@Req() req: Request) {
    return this.activitiesService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una actividad por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la actividad', type: 'number' })
  @ApiResponse({ status: 200, description: 'Actividad encontrada', type: Activity })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada' })
  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN, RolesUsuario.SUPER_USER)
  @Get(':id')
  @LogRequest()
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.activitiesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar una actividad' })
  @ApiParam({ name: 'id', description: 'ID de la actividad a actualizar', type: 'number' })
  @ApiBody({ type: UpdateActivityDto })
  @ApiResponse({ status: 200, description: 'Actividad actualizada', type: Activity })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada' })
  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN, RolesUsuario.SUPER_USER)
  @Patch(':id')
  @LogRequest()
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activitiesService.update(+id, updateActivityDto);
  }
  @ApiOperation({ summary: 'Eliminar una actividad' })
  @ApiParam({ name: 'id', description: 'ID de la actividad a eliminar', type: 'number' })
  @ApiResponse({ status: 200, description: 'Actividad eliminada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada' })
  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN, RolesUsuario.SUPER_USER)
  @Delete(':id')
  @LogRequest()
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.activitiesService.remove(+id);
  }
}
