import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyService } from '../property/property.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { FilterServiceDto } from './dto/filter-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceRepository } from './service.repository';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceRepository)
    private readonly serviceRepository: ServiceRepository,
    private propertyService: PropertyService,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    const newService = this.serviceRepository.create(createServiceDto);
    if (createServiceDto.property_id) {
      const property = await this.propertyService.findOne(
        +createServiceDto.property_id,
      );
      newService.property = property;
    }
    return this.serviceRepository.save(newService);
  }

  findAll(params?: FilterServiceDto) {
    if (params) {
      const { limit, offset } = params;
      return this.serviceRepository.find({
        relations: ['property'],
        take: limit,
        skip: offset,
      });
    }
    return this.serviceRepository.find({
      relations: ['property'],
    });
  }

  findOne(id: number) {
    const object = this.serviceRepository.findOne({
      relations: ['property'],
    });
    if (!object) throw new NotFoundException(`Service #${id} not found`);
    return object;
  }

  async update(id: number, changes: UpdateServiceDto) {
    const object = await this.serviceRepository.findOne(id);
    this.serviceRepository.merge(object, changes);
    return this.serviceRepository.save(object);
  }

  async remove(id: number) {
    const object = await this.serviceRepository.findOne(id);
    object.is_deleted = true;
    return this.serviceRepository.save(object);
  }
}
