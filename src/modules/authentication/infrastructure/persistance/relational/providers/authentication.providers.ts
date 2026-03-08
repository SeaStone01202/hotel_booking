import { AuthenticationRepository } from '../repositories/authentication.repository';
import { AuthenticationRepositoryImpl } from '../repositories/authentication.repository.impl';

export const AuthenticationProviders = [
  {
    provide: AuthenticationRepository,
    useClass: AuthenticationRepositoryImpl,
  },
];
