import { UserRepository } from 'src/modules/user/infrastructure/persistance/user.repository.interface';
import { AuthenticationRepository } from '../../authentication.repository.interface';
import { AuthenticationRepositoryImpl } from '../repositories/authentication.repository';
import { UserRepositoryImpl } from 'src/modules/user/infrastructure/persistance/relational/repositories/user.repository';
import { MailService } from 'src/modules/mail/mail.service';

export const AuthenticationProviders = [
  {
    provide: AuthenticationRepository,
    useClass: AuthenticationRepositoryImpl,
  },
  // {
  //   provide: UserRepository,
  //   useClass: UserRepositoryImpl,
  // },
  // {
  //   provide: MailService,
  //   useClass: MailService,
  // },
];
