import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswers } from '../entities/user-answers.entity';
import { Repository } from 'typeorm';
import { CreateUserAnswersDto, UpdateUserAnswersDto } from '../dtos/user-answers.dto';

@Injectable()
export class UserAnswersService {
    constructor(
        @InjectRepository(UserAnswers) private userAnswersRepository: Repository<UserAnswers>,
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

    create(createUserAnswersDto: CreateUserAnswersDto): Promise<UserAnswers>{
        console.log(Buffer.from(createUserAnswersDto.constructionsRedraw));
        const constructionsDraw = Array.from(Buffer.from(createUserAnswersDto.constructionsDraw));
        const constructionsRedraw = Array.from(Buffer.from(createUserAnswersDto.constructionsRedraw));
        const executiveDraw = Array.from(Buffer.from(createUserAnswersDto.executiveDraw));
        const executiveLinesDraw = Array.from(Buffer.from(createUserAnswersDto.executiveLinesDraw));
        createUserAnswersDto.constructionsDraw = constructionsDraw;
        createUserAnswersDto.constructionsRedraw = constructionsRedraw;
        createUserAnswersDto.executiveDraw = executiveDraw;
        createUserAnswersDto.executiveLinesDraw = executiveLinesDraw;
        
        const userAnswers = this.userAnswersRepository.create(createUserAnswersDto);        
        return this.userAnswersRepository.save(userAnswers);
    }

    async update(id: number, changes: UpdateUserAnswersDto){
        const userAnswers = await this.userAnswersRepository.findOne(id);
        this.userAnswersRepository.merge(userAnswers, changes);
        return this.userAnswersRepository.save(userAnswers);
    }
}
