import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from '../person/person.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { FilterSupplierDto } from './dto/filter-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierRepository } from './supplier.repository';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierRepository)
    private readonly supplierRepository: SupplierRepository,
    private personService: PersonService,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    const newSupplier = this.supplierRepository.create(createSupplierDto);
    if (createSupplierDto.person_id) {
      const person = await this.personService.findOne(
        +createSupplierDto.person_id,
      );
      newSupplier.person = person;
    }
    return this.supplierRepository.save(newSupplier);
  }

  findAll(params?: FilterSupplierDto) {
    if (params) {
      const { limit, offset } = params;
      return this.supplierRepository.find({
        relations: ['person'],
        take: limit,
        skip: offset,
      });
    }
    return this.supplierRepository.find({ relations: ['person'] });
  }

  findOne(id: number) {
    const supplier = this.supplierRepository.findOne({
      relations: ['person'],
    });
    if (!supplier) throw new NotFoundException(`Supplier #${id} not found`);
    return supplier;
  }

  async update(id: number, changes: UpdateSupplierDto) {
    const supplier = await this.supplierRepository.findOne(id);
    this.supplierRepository.merge(supplier, changes);
    return this.supplierRepository.save(supplier);
  }

  async remove(id: number) {
    const object = await this.supplierRepository.findOne(id);
    object.is_deleted = true;
    return this.supplierRepository.save(object);
  }
}
