import { Repository, EntityRepository } from 'typeorm';
import { MovementHeader } from './entities/movement-header.entity';

@EntityRepository(MovementHeader)
export class MovementHeaderRepository extends Repository<MovementHeader> {}
