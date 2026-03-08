import { Injectable, NotFoundException } from '@nestjs/common';
import type { TenantRepository } from './infrastructure/repositories/tenant.repository';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { FilterTenantDto } from './dto/filter-tenant.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TenantEntity } from './infrastructure/entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    private readonly repo: TenantRepository,
  ) {}

  async create(data: CreateTenantDto) {
    return this.repo.create(data as Partial<TenantEntity>);
  }

  async findAll(pagination: PaginationDto) {
    const result = await this.repo.findAll(pagination);
    return {
      data: result.data,
      paginate: {
        total: result.total,
        limit: result.limit,
        offset: result.offset,
        pages: Math.ceil(result.total / result.limit),
      },
    };
  }

  async findWithFilter(filter: FilterTenantDto) {
    const result = await this.repo.findWithFilter(filter);
    return {
      data: result.data,
      paginate: {
        total: result.total,
        limit: result.limit,
        offset: result.offset,
        pages: Math.ceil(result.total / result.limit),
      },
    };
  }

  async findOne(id: string) {
    const entity = await this.repo.findById(id);
    if (!entity) {
      throw new NotFoundException(`Tenant ${id} not found`);
    }
    return entity;
  }

  async update(id: string, data: UpdateTenantDto) {
    await this.findOne(id);
    return this.repo.update(id, data as Partial<TenantEntity>);
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
