import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormAnswers } from '../entities/form-answers.entity';
import { Repository } from 'typeorm';
import { CreateFormAnswersDto, UpdateFormAnswersDto } from '../dtos/form-answers.dto';
import { Form } from '../entities/form.entity';

@Injectable()
export class FormAnswersService {
    constructor(
        @InjectRepository(FormAnswers) private formAnswersRepository: Repository<FormAnswers>,
        @InjectRepository(Form) private formRepository: Repository<Form>,
    ) {}

    findAll(): Promise<FormAnswers[]>{
        return this.formAnswersRepository.find();
    }

    async findOne(id: number): Promise<FormAnswers>{
        const formAnswers = await this.formAnswersRepository.findOne(id);
        if (!formAnswers) {
            throw new NotFoundException(`FormAnswers #${id} not found`);
        }
        return formAnswers;
    }

    async create(formAnswers: CreateFormAnswersDto): Promise<FormAnswers>{        
        const newFormAnswers = await this.formAnswersRepository.create(formAnswers);
        if(formAnswers.formId){
            const form = await this.formRepository.findOne(formAnswers.formId);
            newFormAnswers.form = form;
        }
        return this.formAnswersRepository.save(formAnswers);
    }

    async update(id: number, changes: UpdateFormAnswersDto){
        const formAnswers = await this.formAnswersRepository.findOne(id);
        this.formAnswersRepository.merge(formAnswers, changes);
        return this.formAnswersRepository.save(formAnswers);
    }
}
