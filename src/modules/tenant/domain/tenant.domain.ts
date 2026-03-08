export class Tenant {
  id?: string;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor(partial: Partial<Tenant>) {
    Object.assign(this, partial);
  }
}
