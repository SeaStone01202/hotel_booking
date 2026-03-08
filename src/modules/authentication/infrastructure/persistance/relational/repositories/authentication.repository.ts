import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { AuthenticationEntity } from '../entities/authentication.entity';
import { AuthenticationRepository } from './authentication.repository';
import { PaginatedResult } from 'src/common/dto/paginated-result.dto';

@Injectable()
export class AuthenticationRepositoryImpl extends AuthenticationRepository {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private readonly repo: Repository<AuthenticationEntity>,
  ) {
    super();
  }

  async create(data: Partial<AuthenticationEntity>) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(pagination: any): Promise<PaginatedResult<AuthenticationEntity>> {
    const limit = pagination.limit || 10;
    const offset = pagination.offset || 0;
    const sort = pagination.sort || 'createdAt';
    const order = pagination.order || 'DESC';

    const [data, total] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
      order: { [sort]: order },
    });

    return { data, total, limit, offset };
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async findWithFilter(filter: any): Promise<PaginatedResult<AuthenticationEntity>> {
    const limit = filter.limit || 10;
    const offset = filter.offset || 0;
    const sort = filter.sort || 'createdAt';
    const order = filter.order || 'DESC';
    const search = filter.search;

    const where: any = search ? { guestName: ILike(`%${search}%`) } : {};

    const [data, total] = await this.repo.findAndCount({
      where,
      take: limit,
      skip: offset,
      order: { [sort]: order },
    });

    return { data, total, limit, offset };
  }

  async update(id: string, data: Partial<AuthenticationEntity>) {
    await this.repo.update(id, data);
    const entity = await this.findById(id);
    if (!entity) {
      throw new Error(`Entity ${id} not found`);
    }
    return entity;
  }

  async delete(id: string) {
    await this.repo.softDelete(id);
  }
}
