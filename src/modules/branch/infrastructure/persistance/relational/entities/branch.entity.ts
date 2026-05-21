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
import { TenantEntity } from 'src/modules/tenant/infrastructure/persistence/relational/entities/tenant.entity';

@Entity('branch')
export class BranchEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'uid', type: 'uuid', nullable: false })
  uid!: string;

  @Index('idx_branch_tenant_id')
  @Column({ name: 'tenant_id', type: 'int', nullable: false })
  tenantId!: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.branches, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant!: Relation<TenantEntity>;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name!: string;

  @Column({ name: 'phone', type: 'varchar', nullable: true })
  phone?: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email?: string;

  @Column({ name: 'address', type: 'varchar', nullable: false })
  address!: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  constructor(data?: Partial<BranchEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
