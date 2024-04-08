import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AdminDto, UpdateAdminDto } from '../dtos/admin.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get()
    @ApiOperation({ summary: 'List of all admins' })
    findAll() {
        return this.adminService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find an admin by ID' })
    get(@Param('id', ParseIntPipe) id: number){
        try {
            return this.adminService.findOne(id);    
        } catch (error) {
            throw new NotFoundException(error.message);
        }   
    }

    @Post()
    @ApiOperation({ summary: 'Create a new admin' })
    create(@Body() payload: AdminDto){
        return this.adminService.create(payload);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an admin' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateAdminDto,
    ){
        return this.adminService.update(id, payload);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove an admin' })
    remove(@Param('id', ParseIntPipe) id: number){
        return this.adminService.remove(id);
    }
}
