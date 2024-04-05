import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingService } from '../building/building.service';
import { AssemblyRepository } from './assembly.repository';
import { CreateAssemblyDto } from './dto/create-assembly.dto';
import { FilterAssemblyDto } from './dto/filter-assembly.dto';
import { UpdateAssemblyDto } from './dto/update-assembly.dto';

@Injectable()
export class AssemblyService {
  constructor(
    @InjectRepository(AssemblyRepository)
    private readonly assemblyRepository: AssemblyRepository,
    private buildingService: BuildingService,
  ) {}

  async create(createAssemblyDto: CreateAssemblyDto) {
    const newAssembly = this.assemblyRepository.create(createAssemblyDto);
    if (createAssemblyDto.building_id) {
      const building = await this.buildingService.findOne(
        +createAssemblyDto.building_id,
      );
      newAssembly.building = building;
    }
    return this.assemblyRepository.save(newAssembly);
  }

  findAll(params?: FilterAssemblyDto) {
    if (params) {
      const { limit, offset } = params;
      return this.assemblyRepository.find({
        //relations: ['configuration', 'good'],
        take: limit,
        skip: offset,
      });
    }
    return this.assemblyRepository.find({
      relations: ['building', 'minute'],
    });
  }

  findOne(id: number) {
    const object = this.assemblyRepository.findOne({
      relations: ['building', 'minute'],
    });
    if (!object) throw new NotFoundException(`Assembly #${id} not found`);
    return object;
  }

  async update(id: number, changes: UpdateAssemblyDto) {
    const object = await this.assemblyRepository.findOne(id);
    this.assemblyRepository.merge(object, changes);
    return this.assemblyRepository.save(object);
  }

  async remove(id: number) {
    const object = await this.assemblyRepository.findOne(id);
    object.is_deleted = true;
    return this.assemblyRepository.save(object);
  }
}
