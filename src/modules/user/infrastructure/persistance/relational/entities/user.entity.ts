import { TenantMemberEntity } from 'src/modules/tenant/infrastructure/persistance/relational/entities/tenant-member.entity';
import { TenantEntity } from 'src/modules/tenant/infrastructure/persistance/relational/entities/tenant.entity';
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
import { UserRole } from '../enums/user-role.enum';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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
    name: 'role',
    type: 'smallint',
    default: UserRole.STAFF,
    nullable: false,
  })
  role!: UserRole;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    nullable: false,
  })
  isActive!: boolean;

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
