import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAnswersService } from '../services/user-answers.service';
import { CreateUserAnswersDto, UpdateUserAnswersDto } from '../dtos/user-answers.dto';

@ApiTags('User Answers')
@Controller('user-answers')
export class UserAnswersController {
    constructor(private userAnswersService: UserAnswersService) {}

    @Get()
    @ApiOperation({ summary: 'Get all user user answers' })
    getAll(){
        return this.userAnswersService.findAll();
    }

    @Get(':userAnswersId')
    getOne(@Param('userAnswersId', ParseIntPipe) userAnswersId:number){
        try {
            return this.userAnswersService.findOne(userAnswersId);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    create(@Body() payload: CreateUserAnswersDto){
        return this.userAnswersService.create(payload);
    }

    @Put(':id')	
    update(@Param('id') id: number, @Body() payload: UpdateUserAnswersDto){
        return this.userAnswersService.update(id, payload);
    }
}
