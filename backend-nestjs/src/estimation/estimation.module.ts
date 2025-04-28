import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estimation } from './estimation.entity';
import { EstimationService } from './estimation.service';
import { EstimationController } from './estimation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Estimation])],
  providers: [EstimationService],
  controllers: [EstimationController],
})
export class EstimationModule {}
