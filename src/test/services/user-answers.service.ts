import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswers } from '../entities/user-answers.entity';
import { Repository } from 'typeorm';
import { CreateUserAnswersDto, UpdateUserAnswersDto } from '../dtos/user-answers.dto';
import { ImageProcessingService } from './image-processing.service';
import * as natural from 'natural';
import { Nodehun } from 'nodehun'
import * as fs from 'fs';

const affix = fs.readFileSync('src/dictionaries/en_US.aff');
const dictionary = fs.readFileSync('src/dictionaries/en_US.dic');
const nodehun = new Nodehun(affix, dictionary);

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
        const userAnswers = this.userAnswersRepository.create(createUserAnswersDto);
        const savedUserAnswers = await this.userAnswersRepository.save(userAnswers);

        this.gradeTest(createUserAnswersDto).catch(error => {
            console.error('Error grading test:', error);
        });

        return savedUserAnswers;
    }

    async gradeTest(createUserAnswersDto: CreateUserAnswersDto){     
        var grade = 0; 
        var dateGrade = await this.gradeDate(createUserAnswersDto);
        var namingGrade = this.gradeNaming(createUserAnswersDto.namingPicture1, createUserAnswersDto.namingPicture2);        

        if(dateGrade === 3){
            grade++;
        }
        if((await namingGrade).grade === 2){
            grade++;
        }
        
        return grade;
        
        // var cube = createUserAnswersDto.constructionsRedraw;
        // console.log(cube);
        // // cube = cube.toString().substring(2, cube.length-2).split(',');        
        // const responseCube = await this.imageProcessingService.processCubeDraw(cube[0]);
        // createUserAnswersDto.constructionsRedraw = [...cube, responseCube];
        
        // var executive = createUserAnswersDto.executiveDraw;
        // // executive = executive.toString().substring(2, executive.length-2).split(',');
        // const responseExecutive = await this.imageProcessingService.processExecutiveDraw(executive[0]);
        // createUserAnswersDto.executiveDraw = [...executive, responseExecutive];

        // return {responseCube, responseExecutive};
    }

    async update(id: number, changes: UpdateUserAnswersDto){
        const userAnswers = await this.userAnswersRepository.findOne(id);
        this.userAnswersRepository.merge(userAnswers, changes);
        return this.userAnswersRepository.save(userAnswers);
    }

    async gradeDate(createUserAnswersDto: CreateUserAnswersDto){
        var grade = 0;
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours());
        const day = currentDate.getDate().toString();
        var month = (currentDate.getMonth()+1).toString(); 
        const year = currentDate.getFullYear().toString();

        console.log(currentDate);

        if(month.length === 1){ 
            month = '0' + month;
        }
        if(createUserAnswersDto.orientationMonth.length === 1){
            createUserAnswersDto.orientationMonth = '0' + createUserAnswersDto.orientationMonth;
        }
        
        if(createUserAnswersDto.orientationMonth == month.toString()){
            createUserAnswersDto.orientationMonth = createUserAnswersDto.orientationMonth + "|correct";
            grade++;
        }else{
            createUserAnswersDto.orientationMonth = createUserAnswersDto.orientationMonth + "|incorrect";
        }        
        if(createUserAnswersDto.orientationDay == day.toString()){
            createUserAnswersDto.orientationDay = createUserAnswersDto.orientationDay + "|correct";
            grade++;
        }else{
            createUserAnswersDto.orientationDay = createUserAnswersDto.orientationDay + "|incorrect";
        }        
        if(createUserAnswersDto.orientationYear == year.toString()){            
            createUserAnswersDto.orientationYear = createUserAnswersDto.orientationYear + "|correct";
            grade++;
        }else{
            createUserAnswersDto.orientationYear = createUserAnswersDto.orientationYear + "|'incorrect";
        }  
        return grade;  
    }

    async gradeNaming(name1: string, name2: string){  
        var fixed1 = await this.correctSpelling(name1);
        var fixed2 = await this.correctSpelling(name2);
        var responseName1 = '';
        var responseName2 = '';

        const wordnet = new natural.WordNet();   
        var grade = 0;
        
        await new Promise<void>((resolve) => {
            wordnet.lookup("wreath", function(details) {          
                for (const detail of details){
                    if (detail.synonyms.includes(fixed1)) {
                        grade++;
                        console.log("GRADE: " + grade + " - " + fixed1 + " it can be similar as " + detail.synonyms);
                        if(fixed1 != name1){
                            responseName1 = '|correct|' +  fixed1 + '|' + detail.synonyms.toString();
                        }else{
                            responseName1 = '|correct|' + detail.synonyms.toString();
                        }
                        break;
                    }else{
                        console.log(fixed1 + " it is NOT similar to " + detail.synonyms);                          
                        responseName1 = '|incorrect';
                    }                            
                }      
                resolve();                    
            });
        });

        await new Promise<void>((resolve) => {
            wordnet.lookup("volcano", function(details) {          
                for (const detail of details){
                    if (detail.synonyms.includes(fixed2)) {
                        grade++;
                        console.log("GRADE: " + grade + " - " + fixed2 + " it can be similar as " + detail.synonyms);
                        if(fixed2 != name1){
                            responseName2 = '|correct|' +  fixed2 + '|' + detail.synonyms.toString();
                        }else{
                            responseName2 = '|correct|' + detail.synonyms.toString();
                        }
                        break;
                    }else{
                        console.log(fixed2 + " it is NOT similar to " + detail.synonyms);                          
                        responseName2 = '|incorrect';
                    }                            
                }      
                resolve();                    
            });
        });

        console.log(grade);
        return {grade, responseName1, responseName2};
    }

    async correctSpelling(word: string){
        const result = await nodehun.suggest(word);
        if(result != null && result.length > 0){
            console.log("The word "+ word + " is incorrect. The correct word is "+ result[0]);
            return result[0];
        }else{
            console.log("The word "+ word + " is correct.")
            return word;
        }
    }


}


