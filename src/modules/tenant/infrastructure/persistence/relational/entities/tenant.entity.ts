import { BranchEntity } from 'src/modules/branch/infrastructure/persistance/relational/entities/branch.entity';
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
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { TenantStatus } from '../enums/tenant-status.enum';
import { TenantMemberEntity } from './tenant-member.entity';

@Entity('tenant')
export class TenantEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'name', type: 'varchar', unique: true, nullable: false })
  name!: string;

  @Index('idx_tenant_subdomain', { unique: true })
  @Column({ name: 'subdomain', type: 'varchar', unique: true, nullable: false })
  subdomain!: string;

  @Index('idx_tenant_owner_id')
  @Column({ name: 'uid', type: 'uuid', nullable: false })
  uid!: string;

  @Column({ name: 'owner_id', type: 'int', nullable: false })
  ownerId!: number;

  @ManyToOne(() => UserEntity, (user) => user.ownedTenants, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'owner_id' })
  owner!: Relation<UserEntity>;

  @OneToMany(() => BranchEntity, (branch) => branch.tenant)
  branches?: Relation<BranchEntity[]>;

  @OneToMany(() => TenantMemberEntity, (tenantMember) => tenantMember.tenant)
  members?: Relation<TenantMemberEntity[]>;

  @Column({
    name: 'status',
    type: 'enum',
    enum: TenantStatus,
    default: TenantStatus.PENDING,
    nullable: false,
  })
  status!: TenantStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  constructor(data?: Partial<TenantEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
