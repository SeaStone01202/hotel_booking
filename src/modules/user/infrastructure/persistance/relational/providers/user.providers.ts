import { UserRepository } from "../../user.repository.interface";
import { UserRepositoryImpl } from "../repositories/user.repository";

export const UserProviders = [
  {
    provide: UserRepository,
    useClass: UserRepositoryImpl,
  },
];
