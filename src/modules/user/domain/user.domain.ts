export class User {
  id!: number;

  uid!: string;

  fullName!: string;

  email!: string;

  phone?: string;

  passwordHash!: string;

  isActive!: boolean;

  activeTenantId?: number;

  ownedTenants?: any[];

  tenantMemberships?: any[];

  lastLoginAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
