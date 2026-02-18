const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.error('❌ Module name required');
  process.exit(1);
}

const Name = capitalize(name);
const NAME = name.toUpperCase();
const base = path.join('src', 'core', name);

// ===== FOLDERS =====
[
  base,
  `${base}/domain`,
  `${base}/dto`,
  `${base}/infrastructure/entities`,
  `${base}/infrastructure/repositories`,
  `${base}/infrastructure/providers`,
  `${base}/mappers`,
].forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

// ===== FILES =====
const files = {

  // DOMAIN
  [`${base}/domain/${name}.domain.ts`]:
`export class ${Name} {
  id?: string;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor(partial: Partial<${Name}>) {
    Object.assign(this, partial);
  }
}
`,

  // DTO - CREATE
  [`${base}/dto/create-${name}.dto.ts`]:
`import { IsNotEmpty, IsString } from 'class-validator';

export class Create${Name}Dto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
`,

  // DTO - UPDATE
  [`${base}/dto/update-${name}.dto.ts`]:
`import { IsOptional, IsString } from 'class-validator';

export class Update${Name}Dto {
  @IsOptional()
  @IsString()
  name?: string;
}
`,

  // DTO - FILTER
  [`${base}/dto/filter-${name}.dto.ts`]:
`import { IsOptional, IsString } from 'class-validator';
 import { PaginationDto } from 'src/common/dto/pagination.dto';

export class Filter${Name}Dto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;
}
`,

  // ENTITY
  [`${base}/infrastructure/entities/${name}.entity.ts`]:
`import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('${name}')
export class ${Name}Entity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  constructor(data?: Partial<${Name}Entity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
`,

  // REPOSITORY INTERFACE
  [`${base}/infrastructure/repositories/${name}.repository.ts`]:
`import { ${Name}Entity } from '../entities/${name}.entity';
 import { PaginatedResult } from 'src/common/dto/paginated-result.dto';

export abstract class ${Name}Repository {
  abstract create(data: Partial<${Name}Entity>): Promise<${Name}Entity>;
  abstract findAll(pagination: any): Promise<PaginatedResult<${Name}Entity>>;
  abstract findById(id: string): Promise<${Name}Entity | null>;
  abstract findWithFilter(filter: any): Promise<PaginatedResult<${Name}Entity>>;
  abstract update(id: string, data: Partial<${Name}Entity>): Promise<${Name}Entity>;
  abstract delete(id: string): Promise<void>;
}
`,

  // REPOSITORY IMPLEMENTATION
  [`${base}/infrastructure/repositories/${name}.repository.impl.ts`]:
`import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { ${Name}Entity } from '../entities/${name}.entity';
import { ${Name}Repository } from './${name}.repository';
import { PaginatedResult } from 'src/common/dto/paginated-result.dto';

@Injectable()
export class ${Name}RepositoryImpl extends ${Name}Repository {
  constructor(
    @InjectRepository(${Name}Entity)
    private readonly repo: Repository<${Name}Entity>,
  ) {
    super();
  }

  async create(data: Partial<${Name}Entity>) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(pagination: any): Promise<PaginatedResult<${Name}Entity>> {
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

  async findWithFilter(filter: any): Promise<PaginatedResult<${Name}Entity>> {
    const limit = filter.limit || 10;
    const offset = filter.offset || 0;
    const sort = filter.sort || 'createdAt';
    const order = filter.order || 'DESC';
    const search = filter.search;

    const where: any = search ? { guestName: ILike(\`%\${search}%\`) } : {};

    const [data, total] = await this.repo.findAndCount({
      where,
      take: limit,
      skip: offset,
      order: { [sort]: order },
    });

    return { data, total, limit, offset };
  }

  async update(id: string, data: Partial<${Name}Entity>) {
    await this.repo.update(id, data);
    const entity = await this.findById(id);
    if (!entity) {
      throw new Error(\`Entity \${id} not found\`);
    }
    return entity;
  }

  async delete(id: string) {
    await this.repo.softDelete(id);
  }
}
`,

  // MAPPER
  [`${base}/mappers/${name}.mapper.ts`]:
`import { ${Name}Entity } from '../infrastructure/entities/${name}.entity';
import { ${Name} } from '../domain/${name}.domain';

export class ${Name}Mapper {
  static toDomain(entity: ${Name}Entity): ${Name} {
    return new ${Name}({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  static toEntity(domain: ${Name}): Partial<${Name}Entity> {
    const entity: Partial<${Name}Entity> = {};
    if (domain.id) {
      entity.id = domain.id;
    }
    return entity;
  }
}
`,

  // PROVIDERS
  [`${base}/infrastructure/providers/${name}.providers.ts`]:
`import { ${Name}Repository } from '../repositories/${name}.repository';
import { ${Name}RepositoryImpl } from '../repositories/${name}.repository.impl';

export const ${Name}Providers = [
  {
    provide: ${Name}Repository,
    useClass: ${Name}RepositoryImpl,
  },
];
`,

  // SERVICE
  [`${base}/${name}.service.ts`]:
`import { Injectable, NotFoundException } from '@nestjs/common';
import type { ${Name}Repository } from './infrastructure/repositories/${name}.repository';
import { Create${Name}Dto } from './dto/create-${name}.dto';
import { Update${Name}Dto } from './dto/update-${name}.dto';
import { Filter${Name}Dto } from './dto/filter-${name}.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ${Name}Entity } from './infrastructure/entities/${name}.entity';

@Injectable()
export class ${Name}Service {
  constructor(
    private readonly repo: ${Name}Repository,
  ) {}

  async create(data: Create${Name}Dto) {
    return this.repo.create(data as Partial<${Name}Entity>);
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

  async findWithFilter(filter: Filter${Name}Dto) {
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
      throw new NotFoundException(\`${Name} \${id} not found\`);
    }
    return entity;
  }

  async update(id: string, data: Update${Name}Dto) {
    await this.findOne(id);
    return this.repo.update(id, data as Partial<${Name}Entity>);
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
`,

  // CONTROLLER
  [`${base}/${name}.controller.ts`]:
`import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ${Name}Service } from './${name}.service';
import { Create${Name}Dto } from './dto/create-${name}.dto';
import { Update${Name}Dto } from './dto/update-${name}.dto';
import { Filter${Name}Dto } from './dto/filter-${name}.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('${name}')
export class ${Name}Controller {
  constructor(private readonly service: ${Name}Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ description: 'Created successfully' })
  create(@Body(ValidationPipe) body: Create${Name}Dto) {
    return this.service.create(body);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all with pagination' })
  findAll(@Query(ValidationPipe) pagination: PaginationDto) {
    return this.service.findAll(pagination);
  }

  @Get('filter/search')
  @ApiOkResponse({ description: 'Get with filter and search' })
  findWithFilter(@Query(ValidationPipe) filter: Filter${Name}Dto) {
    return this.service.findWithFilter(filter);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Updated successfully' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) body: Update${Name}Dto,
  ) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ description: 'Deleted successfully' })
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
`,

  // MODULE
  [`${base}/${name}.module.ts`]:
`import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${Name}Controller } from './${name}.controller';
import { ${Name}Service } from './${name}.service';
import { ${Name}Entity } from './infrastructure/entities/${name}.entity';
import { ${Name}Providers } from './infrastructure/providers/${name}.providers';

@Module({
  imports: [TypeOrmModule.forFeature([${Name}Entity])],
  controllers: [${Name}Controller],
  providers: [${Name}Service, ...${Name}Providers],
  exports: [${Name}Service],
})
export class ${Name}Module {}
`,
};

for (const file in files) {
  fs.writeFileSync(file, files[file]);
}

console.log(`✅ Enterprise module "${name}" generated with:`);
console.log(`  ✓ Pagination (limit, offset, sort, order)`);
console.log(`  ✓ Filter & Search`);
console.log(`  ✓ Mapper (toDomain, toEntity with Id check)`);
console.log(`  ✓ DTOs with validation`);
console.log(`  ✓ Constructor for entities`);
console.log(`  ✓ @ApiOkResponse decorators`);
console.log(`  ✓ Full CRUD with Repository pattern`);
console.log(`  ✓ Centralized providers file`);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
