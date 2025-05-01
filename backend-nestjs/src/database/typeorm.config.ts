import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Estimation } from '../estimation/estimation.entity';
import { User } from '../auth/user.entity';
import { Project } from 'src/project/project.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'excel.123',
  database: 'project_estimation',
  entities: [User, Estimation, Project],
  //logging: true,
  synchronize: true, // use migrations in prod!
};
