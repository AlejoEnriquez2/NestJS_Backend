import { Repository, EntityRepository } from 'typeorm';
import { Owner } from './entities/owner.entity';

@EntityRepository(Owner)
export class OwnerRepository extends Repository<Owner> {}
