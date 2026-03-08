import { BranchRepository } from '../repositories/branch.repository';
import { BranchRepositoryImpl } from '../repositories/branch.repository.impl';

export const BranchProviders = [
  {
    provide: BranchRepository,
    useClass: BranchRepositoryImpl,
  },
];
