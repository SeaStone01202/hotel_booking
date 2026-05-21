import { TenantMemberEntity } from 'src/modules/tenant/infrastructure/persistence/relational/entities/tenant-member.entity';
import { TenantEntity } from 'src/modules/tenant/infrastructure/persistence/relational/entities/tenant.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'full_name', type: 'varchar', length: 150, nullable: false })
  fullName!: string;

  @Index('idx_user_email')
  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email!: string;

  @Column({ name: 'phone', type: 'varchar', length: 25, nullable: true })
  phone?: string;

  @Column({ name: 'password_hash', type: 'varchar', nullable: false })
  passwordHash!: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    nullable: false,
  })
  isActive!: boolean;

  @Column({ name: 'uid', type: 'uuid', nullable: false })
  uid!: string;

  @Column({ name: 'active_tenant_id', type: 'int', nullable: true })
  activeTenantId?: number;

  @Column({ type: 'timestamptz', name: 'last_login_at', nullable: true })
  lastLoginAt?: Date;

  @OneToMany(() => TenantEntity, (tenant) => tenant.owner)
  ownedTenants?: Relation<TenantEntity[]>;

  @OneToMany(() => TenantMemberEntity, (tenantMember) => tenantMember.user)
  tenantMemberships?: Relation<TenantMemberEntity[]>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  constructor(data?: Partial<UserEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
