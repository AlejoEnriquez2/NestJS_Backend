import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { ApiOperation } from '@nestjs/swagger';
import { FilterBuildingDto } from './dto/filter-building.dto';

@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  create(@Body() createBuildingDto: CreateBuildingDto) {
    return this.buildingService.create(createBuildingDto);
  }

  @Get()
  @ApiOperation({ summary: 'List of buildings' })
  findAll(@Query() params: FilterBuildingDto) {
    return this.buildingService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
  ) {
    return this.buildingService.update(+id, updateBuildingDto);
  }

  @Patch('/delete/:id')
  remove(@Param('id') id: string) {
    return this.buildingService.remove(+id);
  }
}
