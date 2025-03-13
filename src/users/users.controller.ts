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
import { LogRequest } from 'src/decorators/log-request-decorator/log-request-decorator.decorator';

@Controller('users')
//@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  //@LogRequest()
  //@UseGuards(RolesGuard)
  //@Roles(RolesUsuario.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  //@LogRequest()
  //@UseGuards(RolesGuard)
  //@Roles(RolesUsuario.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  //@LogRequest()
  getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Get(':id')
  //@LogRequest()
  //@UseGuards(RolesGuard)
  //@Roles(RolesUsuario.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  //@LogRequest()
  //@UseGuards(RolesGuard)
  //@Roles(RolesUsuario.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  //@LogRequest()
  //@UseGuards(RolesGuard)
  //@Roles(RolesUsuario.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
