import { Injectable, NotFoundException } from '@nestjs/common';
import type { BranchRepository } from './infrastructure/repositories/branch.repository';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { FilterBranchDto } from './dto/filter-branch.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { BranchEntity } from './infrastructure/entities/branch.entity';

@Injectable()
export class BranchService {
  constructor(
    private readonly repo: BranchRepository,
  ) {}

  async create(data: CreateBranchDto) {
    return this.repo.create(data as Partial<BranchEntity>);
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

  async findWithFilter(filter: FilterBranchDto) {
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
      throw new NotFoundException(`Branch ${id} not found`);
    }
    return entity;
  }

  async update(id: string, data: UpdateBranchDto) {
    await this.findOne(id);
    return this.repo.update(id, data as Partial<BranchEntity>);
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
