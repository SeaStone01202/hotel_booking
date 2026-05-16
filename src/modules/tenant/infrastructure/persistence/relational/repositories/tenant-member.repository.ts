import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { PaginatedResult } from 'src/core/common/dto/paginated-result.dto';
import { TenantMemberRepository } from '../../tenant-member.repository.interface';
import { TenantMemberEntity } from '../entities/tenant-member.entity';
import { TenantMember } from 'src/modules/tenant/domain/tenant-member.domain';
import { TenantMemberMapper } from '../mappers/tenant-member.mapper';

@Injectable()
export class TenantMemberRepositoryImpl extends TenantMemberRepository {
  constructor(
    @InjectRepository(TenantMemberEntity)
    private readonly repo: Repository<TenantMemberEntity>,
  ) {
    super();
  }

  async create(data: Partial<TenantMember>): Promise<TenantMember> {
    const entity = this.repo.create(
      TenantMemberMapper.toEntity(data as any) as TenantMemberEntity,
    );
    const saved = await this.repo.save(entity);
    return TenantMemberMapper.toDomain(saved);
  }

  async findAll(pagination: any): Promise<PaginatedResult<TenantMember>> {
    const limit = pagination.limit || 10;
    const offset = pagination.offset || 0;
    const sort = pagination.sort || 'createdAt';
    const order = pagination.order || 'DESC';

    const [data, total] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
      order: { [sort]: order },
    });

    return {
      data: data.map(TenantMemberMapper.toDomain),
      total,
      limit,
      offset,
    };
  }

  async findById(id: string): Promise<TenantMember | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? TenantMemberMapper.toDomain(entity) : null;
  }

  async findWithFilter(filter: any): Promise<PaginatedResult<TenantMember>> {
    const limit = filter.limit || 10;
    const offset = filter.offset || 0;
    const sort = filter.sort || 'createdAt';
    const order = filter.order || 'DESC';
    const search = filter.search;

    const where: any = search ? { email: ILike(`%${search}%`) } : {};

    const [data, total] = await this.repo.findAndCount({
      where,
      take: limit,
      skip: offset,
      order: { [sort]: order },
    });

    return {
      data: data.map(TenantMemberMapper.toDomain),
      total,
      limit,
      offset,
    };
  }

  async update(id: string, data: Partial<TenantMember>): Promise<TenantMember> {
    await this.repo.update(id, TenantMemberMapper.toEntity(data as any));
    const entity = await this.findById(id);
    if (!entity) {
      throw new Error(`Entity ${id} not found`);
    }
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
