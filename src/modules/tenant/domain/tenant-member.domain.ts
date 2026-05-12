import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TenantStatus } from '../infrastructure/persistence/relational/enums/tenant-status.enum';
import { Relation } from 'typeorm';

export class TenantMember {
  id?: string;

  tenantId!: string;

  userId!: string;

  email!: string;

  isPrimary!: boolean;

  createdAt!: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor(partial: Partial<TenantMember>) {
    Object.assign(this, partial);
  }
}
