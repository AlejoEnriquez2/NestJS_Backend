import { Repository, EntityRepository } from 'typeorm';
import { Good } from './entities/good.entity';

@EntityRepository(Good)
export class GoodRepository extends Repository<Good> {}
