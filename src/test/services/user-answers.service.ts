import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswers } from '../entities/user-answers.entity';
import { Repository } from 'typeorm';
import { CreateUserAnswersDto, UpdateUserAnswersDto } from '../dtos/user-answers.dto';
import { ImageProcessingService } from './image-processing.service';

@Injectable()
export class UserAnswersService {
    constructor(
        @InjectRepository(UserAnswers) private userAnswersRepository: Repository<UserAnswers>,
        private imageProcessingService: ImageProcessingService,
    ) {}

    findAll(): Promise<UserAnswers[]>{
        return this.userAnswersRepository.find();
    }

    async findOne(id: number): Promise<UserAnswers>{
        const userAnswers = await this.userAnswersRepository.findOne(id);
        if (!userAnswers) {
            throw new NotFoundException(`UserAnswers #${id} not found`);
        }
        return userAnswers;
    }

    async create(createUserAnswersDto: CreateUserAnswersDto): Promise<UserAnswers>{           
        const response = await this.imageProcessingService.processExecutiveDraw(createUserAnswersDto.executiveDraw[0])
        createUserAnswersDto.executiveDraw.push(response);   
        const userAnswers = this.userAnswersRepository.create(createUserAnswersDto);        
        return this.userAnswersRepository.save(userAnswers);
    }

    async gradeTest(createUserAnswersDto: CreateUserAnswersDto){
        const response = await this.imageProcessingService.processCubeDraw(createUserAnswersDto.constructionsRedraw[0])
        createUserAnswersDto.constructionsRedraw.push(response);
    }

    async update(id: number, changes: UpdateUserAnswersDto){
        const userAnswers = await this.userAnswersRepository.findOne(id);
        this.userAnswersRepository.merge(userAnswers, changes);
        return this.userAnswersRepository.save(userAnswers);
    }
}
