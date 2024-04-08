import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import { AdminDto, UpdateAdminDto } from '../dtos/admin.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
    ) {}

    async findAll(): Promise<Admin[]> {
        return await this.adminRepository.find();        
    }

    async findOne(id: number): Promise<Admin> {
        const admin = await this.adminRepository.findOne(id);
        if (!admin) {
            throw new NotFoundException(`Admin #${id} not found`);
        }
        return admin;
    }

    create(data: AdminDto){
        const newAdmin = this.adminRepository.create(data);
        return this.adminRepository.save(newAdmin);
    }

    async update(id: number, changes: UpdateAdminDto){
        const admin = await this.findOne(id);
        this.adminRepository.merge(admin, changes);
        return this.adminRepository.save(admin);
    }

    remove(id: number){
        return this.adminRepository.delete(id);
    }
}
