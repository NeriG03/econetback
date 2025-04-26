import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  create(createNoticeDto: CreateNoticeDto) {
    return this.noticeRepository.save(createNoticeDto);
  }

  findAll() {
    return this.noticeRepository.find();
  }

  findOne(id: number) {
    return this.noticeRepository.findOneBy({ id });
  }

  update(id: number, updateNoticeDto: UpdateNoticeDto) {
    return this.noticeRepository.update(id, updateNoticeDto);
  }

  remove(id: number) {
    return this.noticeRepository.update(id, { activo: false });
  }
}
