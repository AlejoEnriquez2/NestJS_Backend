import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'pg';
import { ConfigurationRepository } from './configuration.repository';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(ConfigurationRepository)
    private readonly configurationRepository: ConfigurationRepository,
    @Inject('PG') private clientPg: Client,
  ) {}

  create(data: CreateConfigurationDto) {
    return this.configurationRepository.save(
      this.configurationRepository.create(data),
    );
  }

  findAll() {
    return this.configurationRepository.find();
  }

  async findOne(id: number) {
    const configuration = await this.configurationRepository.findOne(id);
    if (!configuration)
      throw new NotFoundException(`Configuration #${id} not found`);
    return configuration;
  }

  async update(id: number, changes: UpdateConfigurationDto) {
    const configuration = await this.configurationRepository.findOne(id);
    this.configurationRepository.merge(configuration, changes);
    return this.configurationRepository.save(configuration);
  }

  remove(id: number) {
    return this.configurationRepository.delete(id);
  }
}
