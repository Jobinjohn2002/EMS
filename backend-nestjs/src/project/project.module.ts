import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { Estimation } from 'src/estimation/estimation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Estimation])],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
