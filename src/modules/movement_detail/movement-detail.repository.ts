import { Repository, EntityRepository } from 'typeorm';
import { MovementDetail } from './entities/movement-detail.entity';

@EntityRepository(MovementDetail)
export class MovementDetailRepository extends Repository<MovementDetail> {}
