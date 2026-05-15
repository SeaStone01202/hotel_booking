import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TenantStatus } from '../infrastructure/persistence/relational/enums/tenant-status.enum';
import { TenantMemberRole } from '../infrastructure/persistence/relational/enums/tenant-member-role.enum';

export class TenantMember {
  id?: string;

  tenantId!: string;

  userId!: string;

  email!: string;

  isPrimary!: boolean;

  role!: TenantMemberRole;

  createdAt!: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor(partial: Partial<TenantMember>) {
    Object.assign(this, partial);
  }
}
