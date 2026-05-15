export class User {
  id!: string;

  fullName!: string;

  email!: string;

  phone?: string;

  passwordHash!: string;

  isActive!: boolean;

  activeTenantId?: string;

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
