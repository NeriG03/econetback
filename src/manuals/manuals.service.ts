import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManualDto } from './dto/create-manual.dto';
import { UpdateManualDto } from './dto/update-manual.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manual } from './entities/manual.entity';

@Injectable()
export class ManualsService {
  constructor(
    @InjectRepository(Manual)
    private readonly manualRepository: Repository<Manual>,
  ) {
    console.log('ManualsService constructed');
    console.log('Repository injected:', !!this.manualRepository);
  }

  create(createManualDto: CreateManualDto): Promise<Manual> {
    return this.manualRepository.save(createManualDto);
  }

  findAll(): Promise<Manual[]> {
    return this.manualRepository.find();
  }

  async findOne(id: number): Promise<Manual> {
    const manual = await this.manualRepository.findOneBy({ id });
    if (!manual) {
      throw new NotFoundException(`Manual with ID ${id} not found`);
    }
    return manual;
  }

  async update(id: number, updateManualDto: UpdateManualDto) {
    await this.manualRepository.update(id, updateManualDto);
  }

  async remove(id: number) {
    await this.manualRepository.delete(id);
  }
}
