import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('tenant')
export class TenantEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name!: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  subdomain!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  constructor(data?: Partial<TenantEntity>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
