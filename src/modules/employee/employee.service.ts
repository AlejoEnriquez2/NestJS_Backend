import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'pg';
import { PersonService } from '../person/person.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FilterEmployeeDto } from './dto/filter-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private readonly employeeRepository: EmployeeRepository,
    private personService: PersonService,
    @Inject('PG') private clientPg: Client,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const newEmployee = this.employeeRepository.create(createEmployeeDto);
    if (createEmployeeDto.person_id) {
      const person = await this.personService.findOne(
        +createEmployeeDto.person_id,
      );
      newEmployee.person = person;
    }
    return this.employeeRepository.save(newEmployee);
  }

  findAll(params?: FilterEmployeeDto) {
    if (params) {
      const { limit, offset } = params;
      return this.employeeRepository.find({
        relations: ['person'],
        take: limit,
        skip: offset,
      });
    }
    return this.employeeRepository.find({ relations: ['person'] });
  }

  findOne(id: number) {
    const employee = this.employeeRepository.findOne({
      relations: ['person'],
    });
    if (!employee) throw new NotFoundException(`Employee #${id} not found`);
    return employee;
  }

  async update(id: number, changes: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOne(id);
    this.employeeRepository.merge(employee, changes);
    return this.employeeRepository.save(employee);
  }

  async remove(id: number) {
    const object = await this.employeeRepository.findOne(id);
    object.is_deleted = true;
    return this.employeeRepository.save(object);
  }
}
