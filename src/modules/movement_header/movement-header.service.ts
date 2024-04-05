import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingService } from '../building/building.service';
import { CreateMovementHeaderDto } from './dto/create-movement-header.dto';
import { FilterMovementHeaderDto } from './dto/filter-movement-header.dto';
import { UpdateMovementHeaderDto } from './dto/update-movement-header.dto';
import { MovementHeaderRepository } from './movement-header.repository';

@Injectable()
export class MovementHeaderService {
  constructor(
    @InjectRepository(MovementHeaderRepository)
    private readonly movementHeaderRepository: MovementHeaderRepository,
    private buildingService: BuildingService,
  ) {}
  async create(createMovementHeaderDto: CreateMovementHeaderDto) {
    const newMH = this.movementHeaderRepository.create(createMovementHeaderDto);
    if (createMovementHeaderDto.building_id) {
      const building = await this.buildingService.findOne(
        +createMovementHeaderDto.building_id,
      );
      newMH.building = building;
    }
    return this.movementHeaderRepository.save(newMH);
  }

  findAll(params?: FilterMovementHeaderDto) {
    if (params) {
      const { limit, offset } = params;
      return this.movementHeaderRepository.find({
        relations: ['building', 'movement_detail'],
        take: limit,
        skip: offset,
      });
    }
    return this.movementHeaderRepository.find({
      relations: ['building', 'movement_detail'],
    });
  }

  findOne(id: number) {
    const object = this.movementHeaderRepository.findOne({
      relations: ['building', 'movement_detail'],
    });
    if (!object)
      throw new NotFoundException(`Movement Header #${id} not found`);
    return object;
  }

  async update(id: number, updateMovementHeaderDto: UpdateMovementHeaderDto) {
    const object = await this.movementHeaderRepository.findOne(id);
    this.movementHeaderRepository.merge(object, updateMovementHeaderDto);
    return this.movementHeaderRepository.save(object);
  }

  async remove(id: number) {
    const object = await this.movementHeaderRepository.findOne(id);
    object.is_deleted = true;
    return this.movementHeaderRepository.save(object);
  }
}
