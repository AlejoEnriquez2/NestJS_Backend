import { Injectable, NotFoundException } from '@nestjs/common';
import { Readable } from 'stream';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from '../entities/test.entity';
import { Repository } from 'typeorm';
import { UserAnswers } from '../entities/user-answers.entity';
import { CreateTestDto, UpdateTestDto } from '../dtos/test.dto';
import { PatientService } from 'src/user/services/patient.service';
import { UserAnswersService } from './user-answers.service';
import { FormService } from './form.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(Test) private testRepository: Repository<Test>,
        private userAnswersService: UserAnswersService,
        private formService: FormService,
        private patientService: PatientService,
        // private imageProcessingService: ImageProcessingService,
        // @InjectRepository(UserAnswers) private userAnswersRepository: Repository<UserAnswers>,
        // @InjectRepository(Form) private formRepository: Repository<Form>,
        // @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    ) {}

    findAll(): Promise<Test[]>{
        return this.testRepository.find({
            relations: ['answers', 'patient']
        
        });
    }

    async findOne(id: number): Promise<Test>{
        const test = await this.testRepository.findOne({
            where: { testId: id },
            relations: ['answers', 'patient']
        });
        var userAnswers = new UserAnswers();
        if (!test) {
            throw new NotFoundException(`Test #${id} not found`);
        }
        // var response = await this.imageProcessingService.processImage(userAnswers.constructionsRedraw);   
        // console.log(response.type);
        // console.log(userAnswers.constructionsRedraw);
        
        // await this.imageProcessingService.processImage(Buffer.from(userAnswers.constructionsRedraw));
        // await this.imageProcessingService.processImage(userAnswers.constructionsRedraw);
        return test;
    }

    async create(test: CreateTestDto): Promise<{ testId: number }>{
        const newTest = await this.testRepository.create(test);
        var userAnswers = new UserAnswers();
        if (test.answersId) {
            userAnswers = await this.userAnswersService.findOne(test.answersId);
            newTest.answers = userAnswers;
        }
        if (test.formId) {
            // const form = await this.formService.findOne(test.formId);
            newTest.formId = test.formId;
            newTest.testTotalGrade = userAnswers.grade;
            
        }
        if (test.patientId) {
            const patient = await this.patientService.findOne(test.patientId);
            newTest.patient = patient;
            newTest.patient.grade = userAnswers.grade;
            if(userAnswers.grade >= 18){
                newTest.patient.status = "Normal";
            }else if(userAnswers.grade < 17 && userAnswers.grade > 13){
                newTest.patient.status = "Mild Cognitive Impairment, check a doctor soon";
            }else{
                newTest.patient.status = "Go check a doctor as soon as possible";
            }
            await this.patientService.update(test.patientId, newTest.patient);
        }
        const savedTest = await this.testRepository.save(newTest);
        return { testId: savedTest.testId };
    }

    async update(id: number, changes: UpdateTestDto){
        const test = await this.testRepository.findOne(id);
        if (changes.answersId) {
            const userAnswers = await this.userAnswersService.findOne(changes.answersId);
            test.answers = userAnswers;
        }
        if(changes.formId){
            // const form = await this.formService.findOne(changes.formId);
            test.formId = changes.formId;
        }
        if(changes.patientId){
            const patient = await this.patientService.findOne(changes.patientId);
            test.patient = patient;
        }
        this.testRepository.merge(test, changes);
        return this.testRepository.save(test);
    }
}
