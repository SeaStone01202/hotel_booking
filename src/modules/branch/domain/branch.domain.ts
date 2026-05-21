export class Branch {
  id!: number;

  uid!: string;

  tenantId!: number;

  name!: string;

  phone?: string;

  email?: string;

  address!: string;

  isActive!: boolean;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor(partial: Partial<Branch>) {
    Object.assign(this, partial);
  }
}
