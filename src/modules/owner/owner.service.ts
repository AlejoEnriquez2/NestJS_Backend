import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from '../person/person.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { FilterOwnerDto } from './dto/filter-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnerRepository } from './owner.repository';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(OwnerRepository)
    private readonly ownerRepository: OwnerRepository,
    private personService: PersonService,
  ) {}
  async create(createOwnerDto: CreateOwnerDto) {
    const newOwner = this.ownerRepository.create(createOwnerDto);
    if (createOwnerDto.person_id) {
      const person = await this.personService.findOne(
        +createOwnerDto.person_id,
      );
      newOwner.person = person;
    }
    return this.ownerRepository.save(newOwner);
  }

  findAll(params?: FilterOwnerDto) {
    if (params) {
      const { limit, offset } = params;
      return this.ownerRepository.find({
        relations: ['person'],
        take: limit,
        skip: offset,
      });
    }
    return this.ownerRepository.find({ relations: ['person'] });
  }

  findOne(id: number) {
    const owner = this.ownerRepository.findOne({
      relations: ['person'],
    });
    if (!owner) throw new NotFoundException(`Onwer #${id} not found`);
    return owner;
  }

  async update(id: number, changes: UpdateOwnerDto) {
    const owner = await this.ownerRepository.findOne(id);
    this.ownerRepository.merge(owner, changes);
    return this.ownerRepository.save(owner);
  }

  async remove(id: number) {
    const object = await this.ownerRepository.findOne(id);
    object.is_deleted = true;
    return this.ownerRepository.save(object);
  }
}
