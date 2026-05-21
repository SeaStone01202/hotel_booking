import { UserEntity } from 'src/modules/user/infrastructure/persistence/relational/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  type Relation,
} from 'typeorm';
import { TenantEntity } from './tenant.entity';
import { TenantMemberRole } from '../enums/tenant-member-role.enum';

@Entity('tenant_member')
@Unique('uq_tenant_member_tenant_email', ['tenantId', 'email'])
export class TenantMemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'uid', type: 'uuid', nullable: false })
  uid!: string;

  @Index('idx_tenant_member_tenant_id')
  @Column({ name: 'tenant_id', type: 'int', nullable: false })
  tenantId!: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.members, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Relation<TenantEntity>;

  @Index('idx_tenant_member_user_id')
  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId!: number;

  @ManyToOne(() => UserEntity, (user) => user.tenantMemberships, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: Relation<UserEntity>;

  @Index('idx_tenant_member_email')
  @Column({ name: 'email', type: 'varchar', nullable: false })
  email!: string;

  @Column({
    name: 'is_primary',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isPrimary!: boolean;

  @Column({
    name: 'role',
    type: 'smallint',
    default: TenantMemberRole.STAFF,
    nullable: false,
  })
  role!: TenantMemberRole;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  constructor(data?: Partial<TenantMemberEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
