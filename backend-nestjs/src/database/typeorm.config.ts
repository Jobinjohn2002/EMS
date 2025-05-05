import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Estimation } from '../estimation/estimation.entity';
import { User } from '../auth/user.entity';
import { Project } from 'src/project/project.entity';
import { Requirement } from 'src/requirement/requirement.entity';
import { SubRequirement } from 'src/requirement/subrequirement/sub-requirement.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'excel.123',
  database: 'project_estimation',
  entities: [User, Estimation, Project, Requirement, SubRequirement],
  //logging: true,
  synchronize: true, // use migrations in prod!
};
