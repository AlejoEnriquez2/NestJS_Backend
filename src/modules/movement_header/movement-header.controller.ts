import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { MovementHeaderService } from './movement-header.service';
import { CreateMovementHeaderDto } from './dto/create-movement-header.dto';
import { UpdateMovementHeaderDto } from './dto/update-movement-header.dto';

@Controller('movement-header')
export class MovementHeaderController {
  constructor(private readonly movementHeaderService: MovementHeaderService) {}

  @Post()
  create(@Body() createMovementHeaderDto: CreateMovementHeaderDto) {
    return this.movementHeaderService.create(createMovementHeaderDto);
  }

  @Get()
  findAll() {
    return this.movementHeaderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movementHeaderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovementHeaderDto: UpdateMovementHeaderDto,
  ) {
    return this.movementHeaderService.update(+id, updateMovementHeaderDto);
  }

  @Patch('/delete/:id')
  remove(@Param('id') id: string) {
    return this.movementHeaderService.remove(+id);
  }
}
