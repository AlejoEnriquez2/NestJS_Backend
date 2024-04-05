import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingService } from '../building/building.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyRepository } from './property.repository';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(PropertyRepository)
    private readonly propertyRepository: PropertyRepository,
    private buildingService: BuildingService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const newProperty = this.propertyRepository.create(createPropertyDto);
    if (createPropertyDto.building_id) {
      const building = await this.buildingService.findOne(
        +createPropertyDto.building_id,
      );
      newProperty.building = building;
    }
    if (createPropertyDto.super_property_id) {
      const property = await this.propertyRepository.findOne(
        +createPropertyDto.super_property_id,
      );
      newProperty.super_property = property;
    }
    return this.propertyRepository.save(newProperty);
  }

  findAll(params?: FilterPropertyDto) {
    if (params) {
      const { limit, offset } = params;
      return this.propertyRepository.find({
        relations: ['building', 'service', 'super_property'],
        take: limit,
        skip: offset,
      });
    }
    return this.propertyRepository.find({
      relations: ['building', 'service', 'super_property'],
    });
  }

  findOne(id: number) {
    const object = this.propertyRepository.findOne({
      relations: ['building', 'service', 'super_property'],
    });
    if (!object) throw new NotFoundException(`Property #${id} not found`);
    return object;
  }

  async update(id: number, changes: UpdatePropertyDto) {
    const object = await this.propertyRepository.findOne(id);
    this.propertyRepository.merge(object, changes);
    return this.propertyRepository.save(object);
  }

  async remove(id: number) {
    const object = await this.propertyRepository.findOne(id);
    object.is_deleted = true;
    return this.propertyRepository.save(object);
  }
}
