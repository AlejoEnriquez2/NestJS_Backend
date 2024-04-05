import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigurationService } from '../configuration/configuration.service';
import { BuildingRepository } from './building.repository';
import { CreateBuildingDto } from './dto/create-building.dto';
import { FilterBuildingDto } from './dto/filter-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(BuildingRepository)
    private readonly buildingRepository: BuildingRepository,
    private configurationService: ConfigurationService,
  ) {}

  async create(createBuildingDto: CreateBuildingDto) {
    const newBuilding = this.buildingRepository.create(createBuildingDto);
    if (createBuildingDto.configuration_id) {
      const configuration = await this.configurationService.findOne(
        +createBuildingDto.configuration_id,
      );
      newBuilding.configuration = configuration;
    }
    return this.buildingRepository.save(newBuilding);
  }

  findAll(params?: FilterBuildingDto) {
    if (params) {
      const { limit, offset } = params;
      return this.buildingRepository.find({
        relations: ['configuration', 'good', 'property'],
        take: limit,
        skip: offset,
      });
    }
    return this.buildingRepository.find({
      relations: ['configuration', 'good'],
    });
  }

  findOne(id: number) {
    const building = this.buildingRepository.findOne({ relations: ['good'] });
    if (!building) throw new NotFoundException(`Building #${id} not found`);
    return building;
  }

  async update(id: number, changes: UpdateBuildingDto) {
    const building = await this.buildingRepository.findOne(id);
    this.buildingRepository.merge(building, changes);
    return this.buildingRepository.save(building);
  }

  async remove(id: number) {
    const building = await this.buildingRepository.findOne(id);
    building.is_deleted = true;
    return this.buildingRepository.save(building);
  }
}
