import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/core/common/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './infrastructure/persistence/user.repository.interface';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async create(data: CreateUserDto) {
    return this.repo.create(data as any);
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

  async findOne(id: number) {
    const entity = await this.repo.findById(id);
    if (!entity) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return entity;
  }

  async update(id: number, data: UpdateUserDto) {
    await this.findOne(id);
    return this.repo.update(id, data as any);
  }

  async delete(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
