import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AssemblyService } from './assembly.service';
import { CreateAssemblyDto } from './dto/create-assembly.dto';
import { UpdateAssemblyDto } from './dto/update-assembly.dto';

@Controller('assembly')
export class AssemblyController {
  constructor(private readonly assemblyService: AssemblyService) {}

  @Post()
  create(@Body() createAssemblyDto: CreateAssemblyDto) {
    return this.assemblyService.create(createAssemblyDto);
  }

  @Get()
  findAll() {
    return this.assemblyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assemblyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssemblyDto: UpdateAssemblyDto,
  ) {
    return this.assemblyService.update(+id, updateAssemblyDto);
  }

  @Patch('/delete/:id')
  remove(@Param('id') id: string) {
    return this.assemblyService.remove(+id);
  }
}
