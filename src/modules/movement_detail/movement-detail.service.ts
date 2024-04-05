import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementHeaderService } from '../movement_header/movement-header.service';
import { CreateMovementDetailDto } from './dto/create-movement-detail.dto';
import { FilterMovementDetailDto } from './dto/filter-movement-detail.dto';
import { UpdateMovementDetailDto } from './dto/update-movement-detail.dto';
import { MovementDetailRepository } from './movement-detail.repository';

@Injectable()
export class MovementDetailService {
  constructor(
    @InjectRepository(MovementDetailRepository)
    private readonly movementDetailRepository: MovementDetailRepository,
    private movementHeaderService: MovementHeaderService,
  ) {}

  async create(createMovementDetailDto: CreateMovementDetailDto) {
    const newMD = this.movementDetailRepository.create(createMovementDetailDto);
    if (createMovementDetailDto.movement_header_id) {
      const header = await this.movementHeaderService.findOne(
        +createMovementDetailDto.movement_header_id,
      );
      newMD.movement_header = header;
    }
    return this.movementDetailRepository.save(newMD);
  }

  findAll(params?: FilterMovementDetailDto) {
    if (params) {
      const { limit, offset } = params;
      return this.movementDetailRepository.find({
        relations: ['movement_header'],
        take: limit,
        skip: offset,
      });
    }
    return this.movementDetailRepository.find({
      relations: ['movement_header'],
    });
  }

  findOne(id: number) {
    const object = this.movementDetailRepository.findOne({
      relations: ['movement_header'],
    });
    if (!object)
      throw new NotFoundException(`Movement detail #${id} not found`);
    return object;
  }

  async update(id: number, changes: UpdateMovementDetailDto) {
    const object = await this.movementDetailRepository.findOne(id);
    this.movementDetailRepository.merge(object, changes);
    return this.movementDetailRepository.save(object);
  }

  async remove(id: number) {
    const object = await this.movementDetailRepository.findOne(id);
    object.is_deleted = true;
    return this.movementDetailRepository.save(object);
  }
}
