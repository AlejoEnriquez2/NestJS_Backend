import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovementDetailService } from './movement-detail.service';
import { CreateMovementDetailDto } from './dto/create-movement-detail.dto';
import { UpdateMovementDetailDto } from './dto/update-movement-detail.dto';

@Controller('movement-detail')
export class MovementDetailController {
  constructor(private readonly movementDetailService: MovementDetailService) {}

  @Post()
  create(@Body() createMovementDetailDto: CreateMovementDetailDto) {
    return this.movementDetailService.create(createMovementDetailDto);
  }

  @Get()
  findAll() {
    return this.movementDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movementDetailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovementDetailDto: UpdateMovementDetailDto,
  ) {
    return this.movementDetailService.update(+id, updateMovementDetailDto);
  }

  @Patch('/delete/:id')
  remove(@Param('id') id: string) {
    return this.movementDetailService.remove(+id);
  }
}
