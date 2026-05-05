import { BranchRepository } from "../../branch.repository.interface";
import { BranchRepositoryImpl } from "../repositories/branch.repository";

export const BranchProviders = [
  {
    provide: BranchRepository,
    useClass: BranchRepositoryImpl,
  },
];
