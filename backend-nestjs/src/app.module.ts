import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { EstimationModule } from './estimation/estimation.module';
import { ProjectModule } from './project/project.module';
import { RequirementModule } from './requirement/requirement.module';
import { SubRequirementModule } from './requirement/subrequirement/sub-requirement.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    EstimationModule,
    ProjectModule,
    RequirementModule,
    SubRequirementModule
  ],
})
export class AppModule {}
