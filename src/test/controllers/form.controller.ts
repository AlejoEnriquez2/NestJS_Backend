import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { FormService } from '../services/form.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFormDto, UpdateFormDto } from '../dtos/form.dto';

@ApiTags('Form')
@Controller('form')
export class FormController {
    constructor(private formService: FormService) {}

    @Get()
    @ApiOperation({ summary: 'Get all forms' })
    getAll(){
        return this.formService.findAll();
    }

    @Get(':formId')
    @ApiOperation({ summary: 'Get one form' })
    getOne(@Param('formId', ParseIntPipe) formId:number){
        try {
            return this.formService.findOne(formId);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create form' })
    create(@Body() payload: CreateFormDto){
        return this.formService.create(payload);
    }
    
    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateFormDto){
        return this.formService.update(id, payload);
    }
}