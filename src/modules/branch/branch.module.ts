import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { BranchEntity } from './infrastructure/persistance/relational/entities/branch.entity';
import { BranchProviders } from './infrastructure/persistance/relational/providers/branch.providers';

@Module({
  imports: [TypeOrmModule.forFeature([BranchEntity])],
  controllers: [BranchController],
  providers: [BranchService, ...BranchProviders],
  exports: [BranchService],
})
export class BranchModule {}
