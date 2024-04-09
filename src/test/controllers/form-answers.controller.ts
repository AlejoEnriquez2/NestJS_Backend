import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { FormAnswersService } from '../services/form-answers.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFormAnswersDto, UpdateFormAnswersDto } from '../dtos/form-answers.dto';

@ApiTags('Form Answers')
@Controller('form-answers')
export class FormAnswersController {
    constructor(private formAnswersService: FormAnswersService) {}

    @Get()
    @ApiOperation({ summary: 'Get all form answers' })
    getAll(){
        return this.formAnswersService.findAll();
    }

    @Get(':formAnswersId')
    @ApiOperation({ summary: 'Get one form answer' })
    getOne(@Param('formAnswersId', ParseIntPipe) formAnswersId:number){
        try {
            return this.formAnswersService.findOne(formAnswersId);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create form answer' })
    create(@Body() payload: CreateFormAnswersDto){
        return this.formAnswersService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateFormAnswersDto){
        return this.formAnswersService.update(id, payload);
    }
}
