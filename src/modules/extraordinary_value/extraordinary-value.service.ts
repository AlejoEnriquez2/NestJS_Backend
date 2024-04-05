import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MinuteService } from '../minute/minute.service';
import { CreateExtraordinaryValueDto } from './dto/create-extraordinary-value.dto';
import { FilterExtraordinaryValueDto } from './dto/filter-extraordinary-value.dto';
import { UpdateExtraordinaryValueDto } from './dto/update-extraordinary-value.dto';
import { ExtraordinaryValueRepository } from './extraordinary-value.repository';

@Injectable()
export class ExtraordinaryValueService {
  constructor(
    @InjectRepository(ExtraordinaryValueRepository)
    private readonly extraordinaryValueRepository: ExtraordinaryValueRepository,
    private minuteService: MinuteService,
  ) {}

  async create(createExtraordinaryValueDto: CreateExtraordinaryValueDto) {
    const newEV = this.extraordinaryValueRepository.create(
      createExtraordinaryValueDto,
    );
    if (createExtraordinaryValueDto.minute_id) {
      const minute = await this.minuteService.findOne(
        +createExtraordinaryValueDto.minute_id,
      );
      newEV.minute = minute;
    }
    return this.extraordinaryValueRepository.save(newEV);
  }

  findAll(params?: FilterExtraordinaryValueDto) {
    if (params) {
      const { limit, offset } = params;
      return this.extraordinaryValueRepository.find({
        relations: ['minute'],
        take: limit,
        skip: offset,
      });
    }
    return this.extraordinaryValueRepository.find({ relations: ['minute'] });
  }

  findOne(id: number) {
    const object = this.extraordinaryValueRepository.findOne({
      relations: ['minute'],
    });
    if (!object)
      throw new NotFoundException(`Extraordinary Value #${id} not found`);
    return object;
  }

  async update(id: number, changes: UpdateExtraordinaryValueDto) {
    const object = await this.extraordinaryValueRepository.findOne(id);
    this.extraordinaryValueRepository.merge(object, changes);
    return this.extraordinaryValueRepository.save(object);
  }

  async remove(id: number) {
    const object = await this.extraordinaryValueRepository.findOne(id);
    object.is_deleted = true;
    return this.extraordinaryValueRepository.save(object);
  }
}
