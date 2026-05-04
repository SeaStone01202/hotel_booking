import { AuthenticationRepository } from "../../authentication.repository.interface";
import { AuthenticationRepositoryImpl } from "../repositories/authentication.repository";


export const AuthenticationProviders = [
  {
    provide: AuthenticationRepository,
    useClass: AuthenticationRepositoryImpl,
  },
];
