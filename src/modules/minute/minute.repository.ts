import { Repository, EntityRepository } from 'typeorm';
import { Minute } from './entities/minute.entity';

@EntityRepository(Minute)
export class MinuteRepository extends Repository<Minute> {}
