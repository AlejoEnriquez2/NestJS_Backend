import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswers } from '../entities/user-answers.entity';
import { Repository } from 'typeorm';
import { CreateUserAnswersDto, UpdateUserAnswersDto } from '../dtos/user-answers.dto';
import { ImageProcessingService } from './image-processing.service';
import * as natural from 'natural';
import { Nodehun } from 'nodehun'
import * as fs from 'fs';
import * as csv from 'csv-parser';

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
        createUserAnswersDto.namingPicture1 = createUserAnswersDto.namingPicture1 + (await namingGrade).responseName1;
        createUserAnswersDto.namingPicture2 = createUserAnswersDto.namingPicture2 + (await namingGrade).responseName2;
        var similaritiesGrade = await this.gradeSimilarities(createUserAnswersDto.similarities);
        var calculationGrade = await this.gradeCalculation(parseFloat(createUserAnswersDto.calculation1), parseFloat(createUserAnswersDto.calculation2));
        grade = grade + calculationGrade.grade;
        createUserAnswersDto.calculation1 = createUserAnswersDto.calculation1 + calculationGrade.grade1;
        createUserAnswersDto.calculation2 = createUserAnswersDto.calculation2 + calculationGrade.grade2;
        var verbalWordsGrade = await this.gradeWords(createUserAnswersDto.verbalWords.toString());
        console.log(await verbalWordsGrade);


        if(dateGrade === 3){
            grade++;
        }
        if((await namingGrade).grade === 2){
            grade++;
        }
        if(similaritiesGrade === 2){
            grade++;
            createUserAnswersDto.similarities = createUserAnswersDto.similarities + '|correct';
        }else if(similaritiesGrade === 1){
            createUserAnswersDto.similarities = createUserAnswersDto.similarities + '|half-correct';
        }else{
            createUserAnswersDto.similarities = createUserAnswersDto.similarities + '|incorrect';
        }

        // var cube = createUserAnswersDto.constructionsRedraw;
        // console.log(cube);
        // cube = cube.toString().substring(2, cube.length-2).split(',');        
        // const responseCube = await this.imageProcessingService.processCubeDraw(cube[0]);
        // createUserAnswersDto.constructionsRedraw = [...cube, responseCube];
        
        
        return createUserAnswersDto;
        
        
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
                        // console.log("GRADE: " + grade + " - " + fixed1 + " it can be similar as " + detail.synonyms);
                        if(fixed1 != name1){
                            responseName1 = '|correct|*' +  fixed1 + '|' + detail.synonyms.toString();
                        }else{
                            responseName1 = '|correct|' + detail.synonyms.toString();
                        }
                        break;
                    }else{
                        // console.log(fixed1 + " it is NOT similar to " + detail.synonyms);                          
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
                        // console.log("GRADE: " + grade + " - " + fixed2 + " it can be similar as " + detail.synonyms);
                        if(fixed2 != name1){
                            responseName2 = '|correct|*' +  fixed2 + '|' + detail.synonyms.toString();
                        }else{
                            responseName2 = '|correct|' + detail.synonyms.toString();
                        }
                        break;
                    }else{
                        // console.log(fixed2 + " it is NOT similar to " + detail.synonyms);                          
                        responseName2 = '|incorrect';
                    }                            
                }      
                resolve();                    
            });
        });

        // console.log(grade);
        return {grade, responseName1, responseName2};
    }

    async gradeSimilarities(similarities: string){
        var grade = 0;
        const stemmer = natural.PorterStemmer;
        const tokenizer = new natural.WordTokenizer();
        const abstractKeywords = ['concept', 'function', 'abstract', 'measure', 'idea', 'measuring', 'measures', 'checking'];
        const concreteKeywords = ['attribute', 'markings', 'object', 'tangible', 'concrete', 'physical', 'details', 'number', 'numeric'];

        const tokens = tokenizer.tokenize(similarities.toLowerCase());
        // console.log(tokens);
        var fixedWords = [];
        const stemmedTokens = tokens.map(token => stemmer.stem(token));
        // console.log('STEMMED TOKENS: ', stemmedTokens);

        for (const element of stemmedTokens){
            const correctedWord = await this.correctSpelling(element);            
            fixedWords.push(correctedWord);
            // console.log(fixedWords);
        }

        const abstractScore = (fixedWords).filter(token => abstractKeywords.includes(token)).length;
        const concreteScore = (fixedWords).filter(token => concreteKeywords.includes(token)).length;

        console.log('ABSTRACT: '+ abstractScore + ' - CONCRETE: ' + concreteScore);

        if(abstractScore > concreteScore){
            grade = 2;
        }else if(concreteScore > 0){
            grade = 1;
        }
        return grade;
    }

    gradeCalculation(calculation1: number, calculation2: number){
        var grade = 0;
        var grade1 = '';
        var grade2 = '';
        if (calculation1 == 12){
            grade++;
            grade1 = '|correct';
        }else{
            grade1 = '|incorrect';
        }
        if(calculation2 == 6.55){
            grade++;
            grade2 = '|correct';
        }else{
            grade2 = '|incorrect';
        }
        return {grade, grade1, grade2};
    }

    async gradeWords(words: string){
        // var array = words.substring(2, words.length-2).split('",');
        var array = words.substring(2, words.length-2).split(',').map(word => word.replace(/"/g, ''));        
        var grade = 0;
        var animals = await this.getAnimals();
        for (const word of array){
            var fixedWord = this.correctSpelling(word);
            if(animals.includes(word)){
                console.log("Includes: " + word);
                grade++;
            }
        }
        return grade;
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

    async getAnimals(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readFile('src/dictionaries/lowercase_animals.csv', 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const animals = data.split(',');
                    resolve(animals);
                }
            });
        });
    }

}


