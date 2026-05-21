import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { PaginatedResult } from 'src/core/common/dto/paginated-result.dto';
import { UserRepository } from '../../user.repository.interface';
import { User } from 'src/modules/user/domain/user.domain';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {
    super();
  }

  async create(data: Partial<User>): Promise<User> {
    const entity = this.repo.create(
      UserMapper.toEntity(data as any) as UserEntity,
    );
    const saved = await this.repo.save(entity);
    return UserMapper.toDomain(saved);
  }

  async findAll(pagination: any): Promise<PaginatedResult<User>> {
    const limit = pagination.limit || 10;
    const offset = pagination.offset || 0;
    const sort = pagination.sort || 'createdAt';
    const order = pagination.order || 'DESC';

    const [data, total] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
      order: { [sort]: order },
    });

    return { data: data.map(UserMapper.toDomain), total, limit, offset };
  }

  async findById(id: number): Promise<User | null> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: { tenantMemberships: true },
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findWithFilter(filter: any): Promise<PaginatedResult<User>> {
    const limit = filter.limit || 10;
    const offset = filter.offset || 0;
    const sort = filter.sort || 'createdAt';
    const order = filter.order || 'DESC';
    const search = filter.search;

    const where: any = search ? { fullName: ILike(`%${search}%`) } : {};

    const [data, total] = await this.repo.findAndCount({
      where,
      take: limit,
      skip: offset,
      order: { [sort]: order },
    });

    return { data: data.map(UserMapper.toDomain), total, limit, offset };
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.repo.update(id, UserMapper.toEntity(data as any));
    const entity = await this.findById(id);
    if (!entity) {
      throw new Error(`Entity ${id} not found`);
    }
    return entity;
  }

  async delete(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repo.findOne({
      where: { email },
      relations: { tenantMemberships: true },
    });
    return entity ? UserMapper.toDomain(entity) : null;
  }
}
