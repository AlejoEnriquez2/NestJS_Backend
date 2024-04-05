import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { MinuteService } from './minute.service';
import { CreateMinuteDto } from './dto/create-minute.dto';
import { UpdateMinuteDto } from './dto/update-minute.dto';

@Controller('minute')
export class MinuteController {
  constructor(private readonly minuteService: MinuteService) {}

  @Post()
  create(@Body() createMinuteDto: CreateMinuteDto) {
    return this.minuteService.create(createMinuteDto);
  }

  @Get()
  findAll() {
    return this.minuteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.minuteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMinuteDto: UpdateMinuteDto) {
    return this.minuteService.update(+id, updateMinuteDto);
  }

  @Patch('/delete/:id')
  remove(@Param('id') id: string) {
    return this.minuteService.remove(+id);
  }
}
