export class User {
  id?: string;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
