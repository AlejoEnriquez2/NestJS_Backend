import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingService } from '../building/building.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { FilterGoodDto } from './dto/filter-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { GoodRepository } from './good.repository';

@Injectable()
export class GoodService {
  constructor(
    @InjectRepository(GoodRepository)
    private readonly goodRepository: GoodRepository,
    private buildingService: BuildingService,
  ) {}

  async create(createGoodDto: CreateGoodDto) {
    const newGood = this.goodRepository.create(createGoodDto);
    if (createGoodDto.building_id) {
      const building = await this.buildingService.findOne(
        +createGoodDto.building_id,
      );
      newGood.building = building;
    }
    return this.goodRepository.save(newGood);
  }

  findAll(params?: FilterGoodDto) {
    if (params) {
      const { limit, offset } = params;
      return this.goodRepository.find({
        relations: ['building'],
        take: limit,
        skip: offset,
      });
    }
    return this.goodRepository.find({ relations: ['building'] });
  }

  findOne(id: number) {
    const good = this.goodRepository.findOne({ relations: ['building'] });
    if (!good) throw new NotFoundException(`Good #${id} not found`);
    return good;
  }

  async update(id: number, updateGoodDto: UpdateGoodDto) {
    const good = await this.goodRepository.findOne(id);
    this.goodRepository.merge(good, updateGoodDto);
    return this.goodRepository.save(good);
  }

  async remove(id: number) {
    const object = await this.goodRepository.findOne(id);
    object.is_deleted = true;
    return this.goodRepository.save(object);
  }
}
