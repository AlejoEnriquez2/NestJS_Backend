import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { PatientDto } from '../dtos/patient.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @Get()
    @ApiOperation({ summary: 'List of all patients' })
    findAll() {
        return this.patientService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find a patient by ID' })
    get(@Param('id', ParseIntPipe) id: number){
        try {
            return this.patientService.findOne(id);    
        } catch (error) {
            throw new NotFoundException(error.message);
        }   
    }

    @Post()
    @ApiOperation({ summary: 'Create a new patient' })
    create(@Body() payload: PatientDto){
        return this.patientService.create(payload);
    }
    
    @Put(':id')
    @ApiOperation({ summary: 'Update a patient' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: PatientDto,
    ){
        return this.patientService.update(id, payload);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove a patient' })
    remove(@Param('id', ParseIntPipe) id: number){
        return this.patientService.remove(id);
    }
}
