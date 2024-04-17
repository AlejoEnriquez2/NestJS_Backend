import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { PatientDto } from '../dtos/patient.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Patient } from '../entities/patient.entity';
import { GetUser } from '../auth/get-patient.decorator';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @Get()
    @ApiOperation({ summary: 'List of all patients' })
    findAll() {
        return this.patientService.findAll();
    }

    // @Get(':id')
    // @ApiOperation({ summary: 'Find a patient by ID' })
    // @UseGuards(JwtAuthGuard)
    // async get(@Param('id', ParseIntPipe) id: number, @GetUser() user: Patient){
    //     try {
    //         const patient = await this.patientService.findOne(id);
    //         if(patient.id !== user.id) {
    //             throw new UnauthorizedException('You cannot access this resource');
    //         }
    //     } catch (error) {
    //         throw new NotFoundException(error.message);
    //     }   
    // }

    @Get(':id')
    @ApiOperation({ summary: 'Find a patient by ID' })
    get(@Param('id', ParseIntPipe) id: number){
        try {
            return this.patientService.findOne(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get('email/:email')
    @ApiOperation({ summary: 'Find a patient by email' })
    getByEmail(@Param('email') email: string){
        try {
            return this.patientService.findByEmail(email);
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
