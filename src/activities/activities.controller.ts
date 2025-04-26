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

@UseGuards(JwtAuthGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN, RolesUsuario.SUPER_USER)
  @Post()
  @LogRequest()
  create(@Req() req: Request, @Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN, RolesUsuario.SUPER_USER)
  @Get()
  @LogRequest()
  findAll(@Req() req: Request) {
    return this.activitiesService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.USER, RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN, RolesUsuario.SUPER_USER)
  @Get(':id')
  @LogRequest()
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.activitiesService.findOne(+id);
  }

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

  @UseGuards(RolesGuard)
  @Roles(RolesUsuario.ADMIN, RolesUsuario.SUPER_ADMIN, RolesUsuario.SUPER_USER)
  @Delete(':id')
  @LogRequest()
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.activitiesService.remove(+id);
  }
}
