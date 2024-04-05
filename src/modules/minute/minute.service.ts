import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssemblyService } from '../assembly/assembly.service';
import { CreateMinuteDto } from './dto/create-minute.dto';
import { FilterMinuteDto } from './dto/filter-minute.dto';
import { UpdateMinuteDto } from './dto/update-minute.dto';
import { MinuteRepository } from './minute.repository';

@Injectable()
export class MinuteService {
  constructor(
    @InjectRepository(MinuteRepository)
    private readonly minuteRepository: MinuteRepository,
    private assemblyService: AssemblyService,
  ) {}

  async create(createMinuteDto: CreateMinuteDto) {
    const newMinute = this.minuteRepository.create(createMinuteDto);
    if (createMinuteDto.assembly_id) {
      const assembly = await this.assemblyService.findOne(
        +createMinuteDto.assembly_id,
      );
      newMinute.assembly = assembly;
    }
    return this.minuteRepository.save(newMinute);
  }

  findAll(params?: FilterMinuteDto) {
    if (params) {
      const { limit, offset } = params;
      return this.minuteRepository.find({
        relations: ['assembly', 'extraordinary_value'],
        take: limit,
        skip: offset,
      });
    }
    return this.minuteRepository.find({
      relations: ['assembly', 'extraordinary_value'],
    });
  }

  findOne(id: number) {
    const object = this.minuteRepository.findOne({
      relations: ['assembly', 'extraordinary_value'],
    });
    if (!object) throw new NotFoundException(`Minute #${id} not found`);
    return object;
  }

  async update(id: number, updateMinuteDto: UpdateMinuteDto) {
    const object = await this.minuteRepository.findOne(id);
    this.minuteRepository.merge(object, updateMinuteDto);
    return this.minuteRepository.save(object);
  }

  async remove(id: number) {
    const object = await this.minuteRepository.findOne(id);
    object.is_deleted = true;
    return this.minuteRepository.save(object);
  }
}
