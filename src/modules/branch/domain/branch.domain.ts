export class Branch {
  id?: string;

  tenantId!: string;

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
