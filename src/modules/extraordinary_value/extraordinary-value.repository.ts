import { Repository, EntityRepository } from 'typeorm';
import { ExtraordinaryValue } from './entities/extraordinary-value.entity';

@EntityRepository(ExtraordinaryValue)
export class ExtraordinaryValueRepository extends Repository<ExtraordinaryValue> {}
