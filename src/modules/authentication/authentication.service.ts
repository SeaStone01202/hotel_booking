import { Injectable, NotFoundException } from '@nestjs/common';
import type { AuthenticationRepository } from './infrastructure/repositories/authentication.repository';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { FilterAuthenticationDto } from './dto/filter-authentication.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthenticationEntity } from './infrastructure/entities/authentication.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly repo: AuthenticationRepository,
  ) {}

  async create(data: CreateAuthenticationDto) {
    return this.repo.create(data as Partial<AuthenticationEntity>);
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

  async findWithFilter(filter: FilterAuthenticationDto) {
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
      throw new NotFoundException(`Authentication ${id} not found`);
    }
    return entity;
  }

  async update(id: string, data: UpdateAuthenticationDto) {
    await this.findOne(id);
    return this.repo.update(id, data as Partial<AuthenticationEntity>);
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
