import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { EstimationModule } from './estimation/estimation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    EstimationModule,
  ],
})
export class AppModule {}
