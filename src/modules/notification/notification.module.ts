import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationRepository } from './notification.repository';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [PersonModule, TypeOrmModule.forFeature([NotificationRepository])],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
