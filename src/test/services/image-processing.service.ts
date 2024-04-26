import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { UserAnswersService } from "./user-answers.service";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ImageProcessingService {
    constructor(
        private httpService: HttpService,        
    ) {}

    async processCubeDraw(base64Image: string): Promise<any> {
        console.log('Processing image...');

        try {
            const response = await lastValueFrom(this.httpService.post('http://localhost:5000/draw_recognizer', {
                image: base64Image
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }));
            
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error sending image data to API:', error);
            throw error;
        }
    }

    async processExecutiveDraw(base64: string): Promise<any>{
        console.log('Processing Executive image...');
        try {
            const response = await lastValueFrom(this.httpService.post('http://localhost:5000/executive_recognizer', {
                image: base64
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }));
            
            console.log(response.data);
            return response.data;
        }catch (error) {
            console.error('Error sending image data to API:', error);
            throw error;
        }
    }
}