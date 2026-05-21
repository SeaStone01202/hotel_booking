import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TenantStatus } from '../infrastructure/persistence/relational/enums/tenant-status.enum';

export class Tenant {
  id!: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  uid!: string;

  @ApiProperty({ example: 'Acme Corporation' })
  name!: string;

  @ApiProperty({ example: 'acme' })
  subdomain!: string;

  @ApiProperty({ example: 1 })
  ownerId!: number;

  @ApiProperty({ enum: TenantStatus, example: TenantStatus.ACTIVE })
  status!: TenantStatus;

  @ApiPropertyOptional({
    example: { logo: 'https://example.com/logo.png', theme: 'dark' },
  })
  createdAt?: Date;

  @ApiPropertyOptional({ example: '2024-06-01T12:00:00Z' })
  updatedAt?: Date;

  @ApiPropertyOptional({ example: '2024-06-30T12:00:00Z' })
  deletedAt?: Date;

  constructor(partial: Partial<Tenant>) {
    Object.assign(this, partial);
  }
}
