import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from '../person/person.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { FilterTenantDto } from './dto/filter-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantRepository } from './tenant.repository';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantRepository)
    private readonly tenantRepository: TenantRepository,
    private personService: PersonService,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    const newTentant = this.tenantRepository.create(createTenantDto);
    if (createTenantDto.person_id) {
      const person = await this.personService.findOne(
        +createTenantDto.person_id,
      );
      newTentant.person = person;
    }
    return this.tenantRepository.save(newTentant);
  }

  findAll(params?: FilterTenantDto) {
    if (params) {
      const { limit, offset } = params;
      return this.tenantRepository.find({
        relations: ['person'],
        take: limit,
        skip: offset,
      });
    }
    return this.tenantRepository.find({ relations: ['person'] });
  }

  findOne(id: number) {
    const tenant = this.tenantRepository.findOne({
      relations: ['person'],
    });
    if (!tenant) throw new NotFoundException(`Tenant #${id} not found`);
    return tenant;
  }

  async update(id: number, changes: UpdateTenantDto) {
    const tenant = await this.tenantRepository.findOne(id);
    this.tenantRepository.merge(tenant, changes);
    return this.tenantRepository.save(tenant);
  }

  async remove(id: number) {
    const object = await this.tenantRepository.findOne(id);
    object.is_deleted = true;
    return this.tenantRepository.save(object);
  }
}
