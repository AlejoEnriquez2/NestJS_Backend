import { Module } from '@nestjs/common';
import { ExtraordinaryValueService } from './extraordinary-value.service';
import { ExtraordinaryValueController } from './extraordinary-value.controller';
import { ExtraordinaryValueRepository } from './extraordinary-value.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinuteModule } from '../minute/minute.module';

@Module({
  imports: [
    MinuteModule,
    TypeOrmModule.forFeature([ExtraordinaryValueRepository]),
  ],
  controllers: [ExtraordinaryValueController],
  providers: [ExtraordinaryValueService],
  exports: [ExtraordinaryValueService],
})
export class ExtraordinaryValueModule {}
