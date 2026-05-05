import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/core/common/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './infrastructure/persistance/relational/entities/user.entity';
import { UserRepository } from './infrastructure/persistance/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly repo: UserRepository,
  ) {}

  async create(data: CreateUserDto) {
    return this.repo.create(data as Partial<UserEntity>);
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

  async findWithFilter(filter: FilterUserDto) {
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
      throw new NotFoundException(`User ${id} not found`);
    }
    return entity;
  }

  async update(id: string, data: UpdateUserDto) {
    await this.findOne(id);
    return this.repo.update(id, data as Partial<UserEntity>);
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
