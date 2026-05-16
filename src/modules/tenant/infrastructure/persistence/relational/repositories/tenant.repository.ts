import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { TenantEntity } from '../entities/tenant.entity';
import { TenantRepository } from '../../tenant.repository.interface';
import { PaginatedResult } from 'src/core/common/dto/paginated-result.dto';
import { Tenant } from 'src/modules/tenant/domain/tenant.domain';
import { TenantMapper } from '../mappers/tenant.mapper';
import { TenantStatus } from '../enums/tenant-status.enum';

@Injectable()
export class TenantRepositoryImpl extends TenantRepository {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly repo: Repository<TenantEntity>,
  ) {
    super();
  }

  async create(data: Partial<Tenant>): Promise<Tenant> {
    const entity = this.repo.create(
      TenantMapper.toEntity(data as any) as TenantEntity,
    );
    const saved = await this.repo.save(entity);
    return TenantMapper.toDomain(saved);
  }

  async findAll(pagination: any): Promise<PaginatedResult<Tenant>> {
    const limit = pagination.limit || 10;
    const offset = pagination.offset || 0;
    const sort = pagination.sort || 'createdAt';
    const order = pagination.order || 'DESC';

    const [data, total] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
      order: { [sort]: order },
    });

    return { data: data.map(TenantMapper.toDomain), total, limit, offset };
  }

  async findById(id: string): Promise<Tenant | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? TenantMapper.toDomain(entity) : null;
  }

  async findWithFilter(filter: any): Promise<PaginatedResult<Tenant>> {
    const limit = filter.limit || 10;
    const offset = filter.offset || 0;
    const sort = filter.sort || 'createdAt';
    const order = filter.order || 'DESC';
    const search = filter.search;

    const where: any = search ? { name: ILike(`%${search}%`) } : {};

    const [data, total] = await this.repo.findAndCount({
      where,
      take: limit,
      skip: offset,
      order: { [sort]: order },
    });

    return { data: data.map(TenantMapper.toDomain), total, limit, offset };
  }

  async update(id: string, data: Partial<Tenant>): Promise<Tenant> {
    await this.repo.update(id, TenantMapper.toEntity(data as any));
    const entity = await this.findById(id);
    if (!entity) {
      throw new Error(`Entity ${id} not found`);
    }
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }

  async findByTenantNameActive(tenantName: string): Promise<Tenant | null> {
    const entity = await this.repo.findOne({
      where: { name: tenantName, status: TenantStatus.ACTIVE },
    });
    return entity ? TenantMapper.toDomain(entity) : null;
  }
}
