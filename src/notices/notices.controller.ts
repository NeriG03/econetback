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

@UseGuards(JwtAuthGuard)
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.SUPER_USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN)
  @Post()
  @LogRequest()
  create(@Req() req: Request, @Body() createNoticeDto: CreateNoticeDto) {
    return this.noticesService.create(createNoticeDto);
  }

  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.USER, RolesUsuario.SUPER_USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN)
  @Get()
  @LogRequest()
  findAll(@Req() req: Request) {
    return this.noticesService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.USER, RolesUsuario.SUPER_USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN)
  @Get(':id')
  @LogRequest()
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.noticesService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.SUPER_USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN)
  @Patch(':id')
  @LogRequest()
  update(@Req() req: Request, @Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticesService.update(+id, updateNoticeDto);
  }

  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.SUPER_USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN)
  @Delete(':id')
  @LogRequest()
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.noticesService.remove(+id);
  }
}
