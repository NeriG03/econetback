import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
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
import { Notice } from './entities/notice.entity';

@ApiTags('notices')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @ApiOperation({ summary: 'Crear una nueva noticia' })
  @ApiBody({ type: CreateNoticeDto })
  @ApiResponse({ status: 201, description: 'Noticia creada exitosamente', type: Notice })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.SUPER_USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN)
  @Post()
  @LogRequest()
  create(@Req() req: Request, @Body() createNoticeDto: CreateNoticeDto) {
    return this.noticesService.create(createNoticeDto);
  }

  @ApiOperation({ summary: 'Obtener todas las noticias' })
  @ApiResponse({ status: 200, description: 'Lista de noticias', type: [Notice] })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.USER, RolesUsuario.SUPER_USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN)
  @Get()
  @LogRequest()
  findAll(@Req() req: Request) {
    return this.noticesService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una noticia por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la noticia', type: 'number' })
  @ApiResponse({ status: 200, description: 'Noticia encontrada', type: Notice })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @ApiResponse({ status: 404, description: 'Noticia no encontrada' })
  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.USER, RolesUsuario.SUPER_USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN)
  @Get(':id')
  @LogRequest()
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.noticesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar una noticia' })
  @ApiParam({ name: 'id', description: 'ID de la noticia a actualizar', type: 'number' })
  @ApiBody({ type: UpdateNoticeDto })
  @ApiResponse({ status: 200, description: 'Noticia actualizada', type: Notice })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @ApiResponse({ status: 404, description: 'Noticia no encontrada' })
  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.SUPER_USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN)
  @Patch(':id')
  @LogRequest()
  update(@Req() req: Request, @Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticesService.update(+id, updateNoticeDto);
  }

  @ApiOperation({ summary: 'Eliminar una noticia' })
  @ApiParam({ name: 'id', description: 'ID de la noticia a eliminar', type: 'number' })
  @ApiResponse({ status: 200, description: 'Noticia eliminada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @ApiResponse({ status: 404, description: 'Noticia no encontrada' })
  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.SUPER_USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN)
  @Delete(':id')
  @LogRequest()
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.noticesService.remove(+id);
  }
}
