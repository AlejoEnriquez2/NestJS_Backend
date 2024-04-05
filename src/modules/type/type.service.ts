import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { TypeRepository } from './type.repository';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(TypeRepository)
    private readonly typeRepository: TypeRepository,
  ) {}

  create(createTypeDto: CreateTypeDto) {
    const newType = this.typeRepository.create(createTypeDto);
    return this.typeRepository.save(newType);
  }

  findAll() {
    return this.typeRepository.find({
      relations: [
        'supplier',
        'owner',
        'tenant',
        'property',
        'employee',
        'movement_header',
      ],
    });
  }

  findOne(id: number) {
    const type = this.typeRepository.findOne({
      relations: [
        'supplier',
        'owner',
        'tenant',
        'property',
        'employee',
        'movement_header',
      ],
    });
    if (!type) throw new NotFoundException(`Type #${id} not found`);
    return type;
  }

  async update(id: number, changes: UpdateTypeDto) {
    const type = await this.typeRepository.findOne(id);
    this.typeRepository.merge(type, changes);
    return this.typeRepository.save(type);
  }

  remove(id: number) {
    return this.typeRepository.delete(id);
  }
}
