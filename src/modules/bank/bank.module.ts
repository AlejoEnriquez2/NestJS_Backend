import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { BankRepository } from './bank.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingModule } from '../building/building.module';

@Module({
  imports: [BuildingModule, TypeOrmModule.forFeature([BankRepository])],
  controllers: [BankController],
  providers: [BankService],
  exports: [BankService],
})
export class BankModule {}
