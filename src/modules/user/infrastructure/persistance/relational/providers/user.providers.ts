import { UserRepository } from '../repositories/user.repository';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';

export const UserProviders = [
  {
    provide: UserRepository,
    useClass: UserRepositoryImpl,
  },
];
