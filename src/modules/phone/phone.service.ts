import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from '../person/person.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { FilterPhoneDto } from './dto/filter-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhoneRepository } from './phone.repository';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneRepository)
    private readonly phoneRepository: PhoneRepository,
    private personService: PersonService,
  ) {}

  async create(createPhoneDto: CreatePhoneDto) {
    const newPhone = this.phoneRepository.create(createPhoneDto);
    if (createPhoneDto.person_id) {
      const person = await this.personService.findOne(
        +createPhoneDto.person_id,
      );
      newPhone.person = person;
    }
    return this.phoneRepository.save(newPhone);
  }

  findAll(params?: FilterPhoneDto) {
    if (params) {
      const { limit, offset } = params;
      return this.phoneRepository.find({
        relations: ['person'],
        take: limit,
        skip: offset,
      });
    }
    return this.phoneRepository.find({ relations: ['person'] });
  }

  findOne(id: number) {
    const phone = this.phoneRepository.findOne({ relations: ['person'] });
    if (!phone) throw new NotFoundException(`Phone #${id} not found`);
    return phone;
  }

  async update(id: number, changes: UpdatePhoneDto) {
    const phone = await this.phoneRepository.findOne(id);
    this.phoneRepository.merge(phone, changes);
    return this.phoneRepository.save(phone);
  }

  async remove(id: number) {
    const object = await this.phoneRepository.findOne(id);
    object.is_deleted = true;
    return this.phoneRepository.save(object);
  }
}
