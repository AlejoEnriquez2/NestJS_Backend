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

    async create(createUserAnswersDto: CreateUserAnswersDto): Promise<any>{
        const userAnswers = this.userAnswersRepository.create(createUserAnswersDto);
        
        const savedUserAnswers = await this.userAnswersRepository.save(userAnswers);
        
        // try{
        const userAnswersGraded = await this.gradeTest(userAnswers);
        console.log("ABOUT TO SAVE GRADE: " + userAnswersGraded.createUserAnswersDto.grade);
        this.userAnswersRepository.update(userAnswers.answersId, userAnswersGraded.createUserAnswersDto);
        // }catch(error){
        //     console.log(error);
        // }

        return savedUserAnswers;
    }

    async gradeTest(createUserAnswersDto: CreateUserAnswersDto){
        
        var grade = 0;                  // Total grade. Possible points: 22 
        var orientation = 0;            // Day, month and year. Possible points: 4
        var naming = 0;                 // Naming of the pictures. Possible points: 2 
        var similarities = 0;           // Abstract or concrete. Possible points: 2
        var calculation = 0;            // Calculations. Possible points: 2        
        var constructionRedraw = 0;     // Redraw of the picture. Possible points: 2
        var constructionDraw = 0;       // Draw of the clock. Possible points: 2
        var verbal = 0;                 // Verbal fluency. Possible points: 2
        var executiveTrail = 0;         // Trail executive. Possible points: 2
        var executiveLinesDraw = 0;     // Matching the lines and draw. Possible points: 2
        var memory = 0;                 // Memory phrase. Possible points: 2


        orientation = await this.gradeDate(createUserAnswersDto);        
        var namingResponse = await this.gradeNaming(createUserAnswersDto.namingPicture1, createUserAnswersDto.namingPicture2, createUserAnswersDto.formId, createUserAnswersDto.testLanguage);        
        var similaritiesResponse = await this.gradeSimilarities(createUserAnswersDto.similarities, createUserAnswersDto.testLanguage, createUserAnswersDto.formId);
        var calculationResponse = this.gradeCalculation(parseFloat(createUserAnswersDto.calculation1), parseFloat(createUserAnswersDto.calculation2), createUserAnswersDto.formId);
        var verbalWordsResponse = await this.gradeWords(createUserAnswersDto.verbalWords, createUserAnswersDto.formId, createUserAnswersDto.testLanguage);
        var trailResponse = this.gradeTrail(createUserAnswersDto.executiveTrail);
        var memoryResponse = await this.memoryGrade(createUserAnswersDto.memoryPhrase, createUserAnswersDto.formId, createUserAnswersDto.testLanguage);
        
        createUserAnswersDto.namingPicture1 = createUserAnswersDto.namingPicture1 + (await namingResponse).responseName1;
        createUserAnswersDto.namingPicture2 = createUserAnswersDto.namingPicture2 + (await namingResponse).responseName2;
        createUserAnswersDto.calculation1 = createUserAnswersDto.calculation1 + calculationResponse.grade1;
        createUserAnswersDto.calculation2 = createUserAnswersDto.calculation2 + calculationResponse.grade2;
        naming = (await namingResponse).grade;
        calculation = (await calculationResponse).grade;
        
        if(similaritiesResponse === 2){
            similarities = 2;
            createUserAnswersDto.similarities = createUserAnswersDto.similarities + '|correct';
        }else if(similaritiesResponse === 1){
            createUserAnswersDto.similarities = createUserAnswersDto.similarities + '|half-correct';
            similarities = 1;
        }else{
            similarities = 0;
            createUserAnswersDto.similarities = createUserAnswersDto.similarities + '|incorrect';
        }

        var cube = createUserAnswersDto.constructionsRedraw;          
        if(cube.length != 0){
            if(cube[0].length == 1){
                cube = cube.toString().substring(2, cube.length-2).split(',');
            }

            const responseCube = await this.imageProcessingService.processCubeDraw(cube[0], createUserAnswersDto.formId);
            createUserAnswersDto.constructionsRedraw = [...cube, responseCube];
            if(responseCube.isCube == 'yes'){
                console.log(responseCube.isCube);
                constructionRedraw = 2;
            }else if(responseCube.isCube == 'maybe'){
                console.log(responseCube.isCube);
                constructionRedraw = 1;
            }else if(responseCube.isCube == 'no'){
                console.log(responseCube.isCube);
                constructionRedraw = 0;
            }
            
        }else{
            constructionRedraw = 0;
        }
        // try {
            // var words = createUserAnswersDto.verbalWords.toString().substring(2, createUserAnswersDto.verbalWords.length-2).split(',').map(word => word.replace(/"/g, ''));
            // console.log("WORDS LENGTH 1: "+words.length);
        
        console.log("WORDS GRADE: " + createUserAnswersDto.verbalWords[0]);
        if(createUserAnswersDto.verbalWords.length != 0){
            if(createUserAnswersDto.verbalWords[0].length == 1){
                console.log("CREATING VARIABLE WORDS");
                var words = createUserAnswersDto.verbalWords.toString().substring(2, createUserAnswersDto.verbalWords.length-2).split(',').map(word => word.replace(/"/g, ''));
            }

            if(typeof createUserAnswersDto.verbalWords === 'string'){
                if((await verbalWordsResponse) === 12){
                    verbal = 2;
                    words.push('|correct');
                    createUserAnswersDto.verbalWords = words;
                }else if((await verbalWordsResponse) >= 10){
                    verbal = 1;
                    words.push('|half-correct');
                    createUserAnswersDto.verbalWords = words;
                }else{
                    verbal = 0;
                    words.push('|incorrect');
                    createUserAnswersDto.verbalWords = words;
                }
            }else{
                if((await verbalWordsResponse) === 12){
                    verbal = 2;                
                    createUserAnswersDto.verbalWords.push('|correct');
                }else if((await verbalWordsResponse) >= 10){
                    verbal = 1;            
                    createUserAnswersDto.verbalWords.push('|half-correct');
                }else{                
                    createUserAnswersDto.verbalWords.push('|incorrect');
                }
            }
        }

        if (trailResponse === 2){
            executiveTrail = 2;
            createUserAnswersDto.executiveTrail = createUserAnswersDto.executiveTrail + '|correct';
        }else if(trailResponse === 1){
            executiveTrail = 1;
            createUserAnswersDto.executiveTrail = createUserAnswersDto.executiveTrail + '|half-correct';
        }else{
            executiveTrail = 0;
            createUserAnswersDto.executiveTrail = createUserAnswersDto.executiveTrail + '|incorrect';
        }
        
        var executiveLinesForm = 0;
        if(createUserAnswersDto.formId === 1){
            executiveLinesForm = 4;
        }else{
            executiveLinesForm = 2;
        }
        if(parseInt(createUserAnswersDto.executiveLines) === executiveLinesForm){
            executiveLinesDraw++;
            createUserAnswersDto.executiveLines = createUserAnswersDto.executiveLines + '|correct';
        }else{
            createUserAnswersDto.executiveLines = createUserAnswersDto.executiveLines + '|incorrect';
        }
        

        if((await memoryResponse) === 2){
            memory = 2;
            createUserAnswersDto.memoryPhrase = createUserAnswersDto.memoryPhrase + '|correct';
        }else if(await memoryResponse === 1){
            memory = 1;
            createUserAnswersDto.memoryPhrase = createUserAnswersDto.memoryPhrase + '|half-correct';
        }else{
            memory = 0;
            createUserAnswersDto.memoryPhrase = createUserAnswersDto.memoryPhrase + '|incorrect';
        }
        
        
        var executive = createUserAnswersDto.executiveDraw;
        if(executive.length != 0){    
            console.log("RESPONSE CUBE: " + executive[0])
            if(executive[0].length == 1){
                executive = executive.toString().substring(2, executive.length-2).split(',');
            }
            // executive = executive.toString().substring(2, executive.length-2).split(',');
            const responseExecutive = await this.imageProcessingService.processExecutiveDraw(executive[0], createUserAnswersDto.formId);
            createUserAnswersDto.executiveDraw = [...executive, responseExecutive];
            if(responseExecutive.isSimilar == 'yes'){
                console.log(responseExecutive.isSimilar);
                executiveLinesDraw++;
            }else if(responseExecutive.isCorrect == 'no'){
                console.log(responseExecutive.isSimilar);
                executiveLinesDraw++;
            }        
        }

        console.log("#######");
        console.log("Orientation: "+orientation);
        console.log("Naming: "+naming);
        console.log("Similarities "+similarities);
        console.log("Calculation: "+calculation);
        console.log("Construction Redraw: "+constructionRedraw);
        console.log("Construction Draw: "+constructionDraw);
        console.log("Verbal: "+verbal);
        console.log("Executive Trail: "+executiveTrail);
        console.log("Executive Draw: "+executiveLinesDraw);
        console.log("Memory: "+memory);

        grade = orientation +  naming + similarities + calculation + constructionRedraw + constructionDraw + verbal + executiveTrail + executiveLinesDraw + memory;
        console.log(grade);

        createUserAnswersDto.grade = grade;
        
        return {grade, createUserAnswersDto};        
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
        var day = currentDate.getDate().toString();
        var month = (currentDate.getMonth()+1).toString(); 
        const year = currentDate.getFullYear().toString();

        console.log(day);
        console.log(month);

        if(createUserAnswersDto.orientationMonth[0] === '0'){
            month = '0' + month;
        }
        if(createUserAnswersDto.orientationDay[0] === '0'){
            day = '0' + day;
        }
        // if(createUserAnswersDto.orientationMonth.length === 1){
        //     createUserAnswersDto.orientationMonth = '0' + createUserAnswersDto.orientationMonth;
        // }
        
        if(createUserAnswersDto.orientationMonth == month.toString()){
            createUserAnswersDto.orientationMonth = createUserAnswersDto.orientationMonth + "|correct";
            grade++;
        }else{
            createUserAnswersDto.orientationMonth = createUserAnswersDto.orientationMonth + "|incorrect";
        }        
        if(createUserAnswersDto.orientationDay == day.toString()){
            createUserAnswersDto.orientationDay = createUserAnswersDto.orientationDay + "|correct";
            grade=grade+2;
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

    async gradeNaming(name1: string, name2: string, formId: number, language: string){
        var responseName1 = '';
        var responseName2 = '';
        var originalWord1 = '';
        var originalWord2 = '';
        var fixed1: string;
        var fixed2: string;

        // console.log("THE LANGUAGE IS =====> " + language + " AND THE FORM IS =====> " + formId);
        if(language === 'es'){
            fixed1 = (await this.translateWord(name1)).replace(' ','').toString().toLowerCase().replace(',','');
            fixed2 = (await this.translateWord(name2)).replace(' ','').toString().toLowerCase().replace(',','');
            console.log("THE TRANSLATION 1 IS: " + fixed1 + " AND THE TRANSLATION 2 IS: " + fixed2);
        }else{
            fixed1 = (await this.correctSpelling(name1)).replace(' ','').toLowerCase().replace(',','');
            fixed2 = (await this.correctSpelling(name2)).replace(' ','').toLowerCase().replace(',','');
        }

        const wordnet = new natural.WordNet();
        var grade = 0;

        if(formId === 1){
            originalWord1 = 'wreath';
            originalWord2 = 'volcano';
        }else if(formId === 4){
            originalWord1 = 'rhino';
            originalWord2 = 'harp';
        }        
        
        await new Promise<void>((resolve) => {
            wordnet.lookup(originalWord1, async function(details) {          
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
            wordnet.lookup(originalWord2, async function(details) {          
                for (const detail of details){
                    if (detail.synonyms.includes(fixed2)) {
                        grade++;
                        // console.log("GRADE: " + grade + " - " + fixed2 + " it can be similar as " + detail.synonyms);
                        if(fixed2 != name2){
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

    async gradeSimilarities(similarities: string, language: string, formId: number){
        var grade = 0;
        const stemmer = natural.PorterStemmer;
        const tokenizer = new natural.WordTokenizer();
        const wordnet = new natural.WordNet();
        var abstractKeywords;
        var concreteKeywords;

        // console.log('----');

        if(language === 'es'){
            // console.log('translating... ' + similarities);
            similarities = await this.translateWord(similarities);
            // console.log('translated: ' + similarities);
        }

        if(formId == 1){
            abstractKeywords = ['measurement','count', 'counting','concept', 'function', 'abstract', 'measure', 'idea', 'measuring', 'measures', 'checking'];
            concreteKeywords = ['device','tool','attribute', 'marking', 'object', 'tangible', 'concrete', 'physical', 'detail', 'number', 'numeric','unit'];
        }else if(formId == 4){
            abstractKeywords = ['beautiful','flowering','perennial','symbolic','fragant','çolorful', 'color', 'decorative','natural','botanical','seasonal','çultivated','ephemeral','aesthetic'];
            concreteKeywords = ['petal','stem','leave', 'root', 'object', 'bulb', 'flower', 'pollen', 'garden', 'seed', 'garden','plant','bloom'];
        }

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

        var abstractScore = 0;
        var concreteScore = 0;

        for(const word of fixedWords){
            for(const keyword of abstractKeywords){
                await new Promise<void>((resolve) => {
                    wordnet.lookup(keyword, async function(details) {
                        // console.log('LOOKUP ABSTRACT: ' + keyword + ' - ' + word);
                        for (const detail of details){
                            if (detail.synonyms.includes(word)) {
                                abstractScore++;
                                // console.log('ABSTRACT: ' + word + ' - ' + keyword + ' - ' + detail.synonyms);
                                break;
                            }
                        }
                        resolve();
                    });
                });
            }
            for(const keyword of concreteKeywords){
                await new Promise<void>((resolve) => {
                    wordnet.lookup(keyword, async function(details) {
                        // console.log('LOOKUP CONCRETE: ' + keyword + ' - ' + word);
                        for (const detail of details){
                            if (detail.synonyms.includes(word)){
                                concreteScore++;
                                // console.log('CONCRETE: ' + word + ' - ' + keyword + ' - ' + detail.synonyms);
                                break;
                            }
                        }
                        resolve();
                    });
                });
            }
        }

        // const abstractScore = (fixedWords).filter(token => abstractKeywords.includes(token)).length;
        // const concreteScore = (fixedWords).filter(token => concreteKeywords.includes(token)).length;

        // console.log('ABSTRACT: '+ abstractScore + ' - CONCRETE: ' + concreteScore);

        if(abstractScore > concreteScore){
            grade = 2;
        }else if(concreteScore > 0){
            grade = 1;  
        }
        // console.log('----');
        return grade;        
    }

    gradeCalculation(calculation1: number, calculation2: number, formId: number){
        var grade = 0;
        var grade1 = '';
        var grade2 = '';
        var answer1 = 0;
        var answer2 = 0;

        if(formId === 1){
            answer1 = 12;
            answer2 = 6.55
        }else if(formId === 4){
            answer1 = 27;
            answer2 = 1.95;
        }

        if (calculation1 == answer1){
            grade++;
            grade1 = '|correct';
        }else{
            grade1 = '|incorrect';
        }
        if(calculation2 == answer2){
            grade++;
            grade2 = '|correct';
        }else{
            grade2 = '|incorrect';
        }
        return {grade, grade1, grade2};
    }

    async gradeWords(words: string[], formId: number, language: string){
        // console.log("WORDS EMPTY: " + typeof words);
        console.log("WORDS EMPTY: " + words);
        var finalWords = [];
        if(words.length > 9){
            if(words[0].length == 1){
                words = words.toString().substring(2, words.length-2).split(',').map(word => word.replace(/"/g, ''));
            }
            var topic = '';
            if(formId === 1){
                topic = 'animals';
            }else if(formId === 4){
                topic = 'countries';
            }
            
            if(language === 'es'){
                for (const word of words){
                    var translation = await this.translateWord(word);
                    finalWords.push(translation); 
                }
                words = finalWords;
            }

            var grade = 0;
            var wordList = await this.getWords(topic);            
            for (const word of words){
                var fixedWord = await this.correctSpellingContext(word, topic);
                console.log(fixedWord);
                if(wordList.some(async w => w.includes(await fixedWord))){
                    grade++;
                    console.log("Includes: " + word + " | Grade: " + grade);
                }
            }
            return grade;
        }
        return 0;
    }

    gradeTrail(trail: string){        
        const answer = ["1","A","2","B","3","C","4","D","5","E","6","F"];
        var trailArray = trail.substring(1, trail.length-1).split(',').map(item => item.trim());
        console.log("RIGHT ANSWER: "+answer);
        console.log("TRAIL: "+trailArray);
        var differences = 0;
        for (let i = 0; i < answer.length; i++) {
            // console.log("Comparing: " + answer[i] + " with " + trailArray[i])
            if (answer[i] !== trailArray[i]) {
                differences++;
            }
        }
        // for (let i = 0; i < answer.length; i += 2) {
        //     console.log("Comparing: " + answer[i] + " with " + trailArray[i])
        //     console.log("Comparing: " + answer[i+1] + " with " + trailArray[i+1])
        //     if (answer[i] !== trailArray[i] || answer[i+1] !== trailArray[i+1]) {
        //         differences++;
        //     }
        // }

        console.log("DIFFERENCES: " + differences);
        if(differences === 0){
            return 2;
        }else if(differences <= 3){
            return 1;
        }else{
            return 0;
        }
    }

    async memoryGrade(phrase: string, formId: number, language: string){
        var correctPhrase = '';
        phrase = phrase.toLowerCase();

        if(language === 'en'){
            if(formId === 1){
                correctPhrase = "i am done";
            }else{
                correctPhrase = "i have finished";
            }
            var fixedPhraseArray = phrase.split(' ').map(word => this.correctSpelling(word));
            var fixedPhrase = (await Promise.all(fixedPhraseArray)).join(' ');
        }else if(language === 'es'){
            if(formId === 1){
                correctPhrase = "terminé";
            }else{
                correctPhrase = "he finalizado";
            }
            fixedPhrase = phrase;
        }

        console.log("CORRECT PHRASE: "+correctPhrase + " - To COMPARE PHRASE: "+fixedPhrase);
        if(correctPhrase === await fixedPhrase){
            console.log("EQUALS");
            return 2;
        }else if(phrase.includes('done') || phrase.includes('finished') || phrase.includes('terminé') || phrase.includes('finalizado')){
            console.log("INCLUDES DONE");
            return 1;
        }else{
            console.log("IS NOT EQUAL");
            return 0;
        }
    }

    async correctSpelling(word: string){
        const result = await nodehun.suggest(word);
        if(result != null && result.length > 0){
            // console.log("The word "+ word + " is incorrect. The correct word is "+ result[0]);
            return result[0];
        }else{
            // console.log("The word "+ word + " is correct.")
            return word;
        }
    }

    async correctSpellingContext(word: string, context: string){
        const result = await nodehun.suggest(word);        
        const animals = await this.getWords(context);
        if(result != null && result.length > 0){
            for (const suggestion of result) {
                if (animals.includes(suggestion.toLowerCase())) {
                    // console.log("The word "+ word + " is incorrect. The correct word is "+ suggestion);
                    return suggestion;
                }
            }
        }

        // console.log("The word "+ word + " is correct.")
        return word;
    }

    async getWords(topic: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            var path = '';
            if(topic == 'animals'){
                path = 'src/dictionaries/lowercase_animals.csv';
            }else{
                path = 'src/dictionaries/countries.csv';
            }

            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const words = data.split(',');    
                    console.log(words.length);
                    resolve(words);
                }
            });
        });
    }

    async translateWord(word: string){
        const {Translate} = require('@google-cloud/translate').v2;        
        const translate = new Translate({key: 'AIzaSyC3N0QfUkAmXtDLnG9m8GJq0wfO9MjWXxQ'});
        const options = {
            from: 'es',
            to: 'en',
        };
        
        let [translations] = await translate.translate(word, options);
        // console.log("TRANSLATION BACKEND: "+translations);
        return translations;
    }
}


