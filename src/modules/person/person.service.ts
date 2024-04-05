import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { FilterPersonDto } from './dto/filter-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonRepository)
    private readonly personRepository: PersonRepository,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const newPerson = this.personRepository.create(createPersonDto);
    return this.personRepository.save(newPerson);
  }

  findAll(params?: FilterPersonDto) {
    if (params) {
      const { limit, offset } = params;
      return this.personRepository.find({
        relations: ['phone'],
        take: limit,
        skip: offset,
      });
    }
    return this.personRepository.find({ relations: ['phone'] });
  }

  findOne(id: number) {
    const person = this.personRepository.findOne({ relations: ['phone'] });
    if (!person) throw new NotFoundException(`Person #${id} not found`);
    return person;
  }

  async update(id: number, changes: UpdatePersonDto) {
    const object = await this.personRepository.findOne(id);
    this.personRepository.merge(object, changes);
    return this.personRepository.save(object);
  }

  async remove(id: number) {
    const object = await this.personRepository.findOne(id);
    object.is_deleted = true;
    return this.personRepository.save(object);
  }
}
