import { Repository, EntityRepository } from 'typeorm';
import { Assembly } from './entities/assembly.entity';

@EntityRepository(Assembly)
export class AssemblyRepository extends Repository<Assembly> {}
