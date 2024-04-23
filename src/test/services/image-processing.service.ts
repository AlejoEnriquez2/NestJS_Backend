import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { UserAnswersService } from "./user-answers.service";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ImageProcessingService {
    constructor(
        private httpService: HttpService,
        private userAnswersService: UserAnswersService
    ) {}

    async processImage(image_buffer: Buffer): Promise<any> {
        console.log('Processing image...');
        
        // Convert buffer to an array of integers
        const imageArray = Array.from(image_buffer);

        try {
            const response = await lastValueFrom(this.httpService.post('http://localhost:5000/recognizer', {
                image: imageArray
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
}