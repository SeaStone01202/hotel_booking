import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { BranchEntity } from '../entities/branch.entity';
import { BranchRepository } from '../../branch.repository.interface';
import { PaginatedResult } from 'src/core/common/dto/paginated-result.dto';
import { Branch } from 'src/modules/branch/domain/branch.domain';
import { BranchMapper } from '../mappers/branch.mapper';

@Injectable()
export class BranchRepositoryImpl extends BranchRepository {
  constructor(
    @InjectRepository(BranchEntity)
    private readonly repo: Repository<BranchEntity>,
  ) {
    super();
  }

  async create(data: Partial<Branch>): Promise<Branch> {
    const entity = this.repo.create(
      BranchMapper.toEntity(data as any) as BranchEntity,
    );
    const saved = await this.repo.save(entity);
    return BranchMapper.toDomain(saved);
  }

  async findAll(pagination: any): Promise<PaginatedResult<Branch>> {
    const limit = pagination.limit || 10;
    const offset = pagination.offset || 0;
    const sort = pagination.sort || 'createdAt';
    const order = pagination.order || 'DESC';

    const [data, total] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
      order: { [sort]: order },
    });

    return { data: data.map(BranchMapper.toDomain), total, limit, offset };
  }

  async findById(id: string): Promise<Branch | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? BranchMapper.toDomain(entity) : null;
  }

  async findWithFilter(filter: any): Promise<PaginatedResult<Branch>> {
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

    return { data: data.map(BranchMapper.toDomain), total, limit, offset };
  }

  async update(id: string, data: Partial<Branch>): Promise<Branch> {
    await this.repo.update(id, BranchMapper.toEntity(data as any));
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
