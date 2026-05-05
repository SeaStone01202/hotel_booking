export class Branch {
  id?: string;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor(partial: Partial<Branch>) {
    Object.assign(this, partial);
  }
}
