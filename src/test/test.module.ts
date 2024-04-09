import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestController } from './controllers/test.controller';
import { TestService } from './services/test.service';

import { Test } from './entities/test.entity';
import { Form } from './entities/form.entity';
import { Patient } from 'src/user/entities/patient.entity';
import { UserAnswers } from './entities/user-answers.entity';

import { FormService } from './services/form.service';
import { UserAnswersService } from './services/user-answers.service';
import { FormAnswersService } from './services/form-answers.service';
import { FormController } from './controllers/form.controller';
import { FormAnswersController } from './controllers/form-answers.controller';
import { UserAnswersController } from './controllers/user-answers.controller';
import { PatientService } from 'src/user/services/patient.service';
import { FormAnswers } from './entities/form-answers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test, UserAnswers, Form, Patient, FormAnswers])], 
  controllers: [TestController, FormController, UserAnswersController, FormAnswersController],
  providers: [TestService, FormService, UserAnswersService, FormAnswersService, PatientService]
})
export class TestModule {}
