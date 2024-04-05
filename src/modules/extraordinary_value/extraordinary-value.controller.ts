import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ExtraordinaryValueService } from './extraordinary-value.service';
import { CreateExtraordinaryValueDto } from './dto/create-extraordinary-value.dto';
import { UpdateExtraordinaryValueDto } from './dto/update-extraordinary-value.dto';

@Controller('extraordinary-value')
export class ExtraordinaryValueController {
  constructor(
    private readonly extraordinaryValueService: ExtraordinaryValueService,
  ) {}

  @Post()
  create(@Body() createExtraordinaryValueDto: CreateExtraordinaryValueDto) {
    return this.extraordinaryValueService.create(createExtraordinaryValueDto);
  }

  @Get()
  findAll() {
    return this.extraordinaryValueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extraordinaryValueService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExtraordinaryValueDto: UpdateExtraordinaryValueDto,
  ) {
    return this.extraordinaryValueService.update(
      +id,
      updateExtraordinaryValueDto,
    );
  }

  @Patch('/delete/:id')
  remove(@Param('id') id: string) {
    return this.extraordinaryValueService.remove(+id);
  }
}
