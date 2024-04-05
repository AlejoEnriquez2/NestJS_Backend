import { Repository, EntityRepository } from 'typeorm';
import { Bank } from './entities/bank.entity';

@EntityRepository(Bank)
export class BankRepository extends Repository<Bank> {}
