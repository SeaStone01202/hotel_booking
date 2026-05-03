import { UserEntity } from 'src/modules/user/infrastructure/persistance/relational/entities/user.entity';
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

@Entity('tenant_member')
@Unique('uq_tenant_member_tenant_email', ['tenantId', 'email'])
export class TenantMemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_tenant_member_tenant_id')
  @Column({ type: 'uuid', name: 'tenant_id', nullable: false })
  tenantId!: string;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.members, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Relation<TenantEntity>;

  @Index('idx_tenant_member_user_id')
  @Column({ type: 'uuid', name: 'user_id', nullable: false })
  userId!: string;

  @ManyToOne(() => UserEntity, (user) => user.tenantMemberships, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: Relation<UserEntity>;

  @Index('idx_tenant_member_email')
  @Column({ type: 'varchar', name: 'email', nullable: false })
  email!: string;

  @Column({
    type: 'boolean',
    name: 'is_primary',
    nullable: false,
    default: false,
  })
  isPrimary!: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  constructor(data?: Partial<TenantMemberEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
