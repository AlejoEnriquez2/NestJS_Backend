import { Repository, EntityRepository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

@EntityRepository(Tenant)
export class TenantRepository extends Repository<Tenant> {}
