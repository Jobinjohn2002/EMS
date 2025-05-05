import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubRequirement } from './sub-requirement.entity';
import { SubRequirementService } from './sub-requirement.service';
import { SubRequirementController } from './sub-requirement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubRequirement])],
  providers: [SubRequirementService],
  controllers: [SubRequirementController],
})
export class SubRequirementModule {}
