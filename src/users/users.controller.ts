import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/auth-decorators/roles.decorator';
import { RolesUsuario } from '../enums/Roles-Usuarios.enum';
import { CurrentUser } from '../auth/auth-decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { LogRequest } from 'src/decorators/log-request-decorator.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
//@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: User })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @Post()
  //@LogRequest()
  //@UseGuards(RolesGuard)
  //@Roles(RolesUsuario.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [User] })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @Get()
  //@LogRequest()
  //@UseGuards(RolesGuard)
  //@Roles(RolesUsuario.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario', type: User })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @Get('profile')
  //@LogRequest()
  getProfile(@CurrentUser() user: User) {
    return user;
  }

  @ApiOperation({ summary: 'Obtener un usuario por su ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: 'number' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Get(':id')
  //@LogRequest()
  //@UseGuards(RolesGuard)
  //@Roles(RolesUsuario.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a actualizar', type: 'number' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado', type: User })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Patch(':id')
  //@LogRequest()
  //@UseGuards(RolesGuard)
  //@Roles(RolesUsuario.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar', type: 'number' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido - rol insuficiente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Delete(':id')
  //@LogRequest()
  //@UseGuards(RolesGuard)
  //@Roles(RolesUsuario.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
