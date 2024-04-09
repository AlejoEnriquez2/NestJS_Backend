import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from '../entities/form.entity';
import { Repository } from 'typeorm';
import { CreateFormDto, UpdateFormDto } from '../dtos/form.dto';

@Injectable()
export class FormService {
    constructor(
        @InjectRepository(Form) private formRepository: Repository<Form>,
    ) {}

    findAll(): Promise<Form[]>{
        return this.formRepository.find();
    }

    async findOne(id: number): Promise<Form>{
        const form = await this.formRepository.findOne(id);
        if (!form) {
            throw new NotFoundException(`Form #${id} not found`);
        }
        return form;
    }

    create(createFormDto: CreateFormDto): Promise<Form>{
        const form = this.formRepository.create(createFormDto);
        return this.formRepository.save(form);
    }

    async update(id: number, changes: UpdateFormDto){
        const form = await this.formRepository.findOne(id);
        this.formRepository.merge(form, changes);
        return this.formRepository.save(form);
    }
}
