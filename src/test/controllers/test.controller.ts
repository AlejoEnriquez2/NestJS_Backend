import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TestService } from '../services/test.service';
import { CreateTestDto, UpdateTestDto } from '../dtos/test.dto';

@ApiTags('Test')
@Controller('test')
export class TestController {
    constructor(private testService: TestService) {}

    @Get()
    @ApiOperation({ summary: 'Get all tests' })
    getAll(){
        return this.testService.findAll();
    }


    @Get(':testId')
    @HttpCode(HttpStatus.ACCEPTED)
    getOne(@Param('testId', ParseIntPipe) testId:number){
        try{
            return this.testService.findOne(testId);
        }catch(error){
            throw new NotFoundException(error.message);
        }
        
    }

    @Post()
    create(@Body() payload: CreateTestDto){
        return this.testService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateTestDto){
        return this.testService.update(id, payload);
    }


}
