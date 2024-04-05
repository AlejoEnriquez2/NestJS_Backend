import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingService } from '../building/building.service';
import { BankRepository } from './bank.repository';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(BankRepository)
    private readonly bankRepository: BankRepository,
    private buildingService: BuildingService,
  ) {}

  async create(createBankDto: CreateBankDto) {
    const newBank = this.bankRepository.create(createBankDto);
    if (createBankDto.building_id) {
      const building = await this.buildingService.findOne(
        +createBankDto.building_id,
      );
      newBank.building = building;
    }
    return this.bankRepository.save(newBank);
  }

  findAll() {
    return this.bankRepository.find({ relations: ['building'] });
  }

  findOne(id: number) {
    const bank = this.bankRepository.findOne({ relations: ['building'] });
    if (!bank) throw new NotFoundException(`Bank #${id} not found`);
    return bank;
  }

  async update(id: number, updateBankDto: UpdateBankDto) {
    const bank = await this.bankRepository.findOne(id);
    this.bankRepository.merge(bank, updateBankDto);
    return this.bankRepository.save(bank);
  }

  async remove(id: number) {
    const object = await this.bankRepository.findOne(id);
    object.is_deleted = true;
    return this.bankRepository.save(object);
  }
}
