export class Authentication {
  id?: string;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor(partial: Partial<Authentication>) {
    Object.assign(this, partial);
  }
}
