export class Mail {
  id?: string;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor(partial: Partial<Mail>) {
    Object.assign(this, partial);
  }
}
