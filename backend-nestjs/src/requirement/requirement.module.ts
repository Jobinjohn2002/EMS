import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requirement } from './requirement.entity';
import { RequirementService } from './requirement.service';
import { RequirementController } from './requirement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Requirement])],
  providers: [RequirementService],
  controllers: [RequirementController],
})
export class RequirementModule {}
