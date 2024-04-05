import { Repository, EntityRepository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';

@EntityRepository(Supplier)
export class SupplierRepository extends Repository<Supplier> {}
