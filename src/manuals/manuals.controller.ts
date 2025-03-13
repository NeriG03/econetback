import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ManualsService } from './manuals.service';
import { CreateManualDto } from './dto/create-manual.dto';
import { UpdateManualDto } from './dto/update-manual.dto';
import { LogRequest } from 'src/decorators/log-request-decorator.decorator';
import { Request } from 'express';
import { Manual } from './entities/manual.entity';

@Controller('manuals')
export class ManualsController {
  constructor(private readonly manualsService: ManualsService) {}

  @Post()
  @LogRequest()
  create(@Req() req: Request, @Body() createManualDto: CreateManualDto): Promise<Manual> {
    return this.manualsService.create(createManualDto);
  }

  @Get()
  @LogRequest()
  findAll(@Req() req: Request): Promise<Manual[]> {
    return this.manualsService.findAll();
  }

  @Get(':id')
  @LogRequest()
  findOne(@Req() req: Request, @Param('id') id: string): Promise<Manual> {
    return this.manualsService.findOne(+id);
  }

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

  @Delete(':id')
  @LogRequest()
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Manual> {
    const manual = await this.manualsService.findOne(+id);
    await this.manualsService.remove(+id);
    return manual;
  }
}
