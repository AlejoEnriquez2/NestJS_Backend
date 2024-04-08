import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        HOST_DB: Joi.string().required(),
        NAME_DB: Joi.string().required(),
        USERNAME_DB: Joi.string().required(),
        PASSWORD_DB: Joi.string().required(),
        PORT_DB: Joi.number().required(),
      }),
    }),
    ConfigModule,
    DatabaseModule,    
    UserModule, TestModule,
  ],
})
export class AppModule {}
