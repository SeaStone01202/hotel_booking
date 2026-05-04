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

  @Column({ type: 'varchar', length: 150, nullable: false })
  fullName!: string;

  @Index('idx_user_email')
  @Column({ type: 'varchar', length: 255, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', name: 'password_hash', nullable: false })
  passwordHash!: string;

  @Column({ type: 'smallint', default: UserRole.STAFF, nullable: false })
  role!: UserRole;

  @Column({
    type: 'boolean',
    name: 'is_active',
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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  constructor(data?: Partial<UserEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
