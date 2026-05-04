import {
  Index,
  JoinColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  type Relation,
} from 'typeorm';
import { TenantEntity } from 'src/modules/tenant/infrastructure/persistance/relational/entities/tenant.entity';

@Entity('branch')
export class BranchEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('idx_branch_tenant_id')
  @Column({ type: 'uuid', name: 'tenant_id', nullable: false })
  tenantId!: string;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.branches, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Relation<TenantEntity>;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string;

  @Column({ type: 'varchar', nullable: false })
  address!: string;

  @Column({ type: 'boolean', name: 'is_active', nullable: false, default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  constructor(data?: Partial<BranchEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
