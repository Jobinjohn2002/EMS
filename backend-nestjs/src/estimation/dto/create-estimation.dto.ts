// create-estimation.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsInt, IsDateString } from 'class-validator';

export class CreateEstimationDto {
  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsInt()
  @IsOptional()
  status?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  approvedBy?: string;

  @IsInt()
  preparedBy: number;

  @IsString()
  @IsOptional()
  versionNo?: string;

  @IsDateString()
  @IsOptional()
  createdAt?: Date;

  @IsDateString()
  @IsOptional()
  modifiedAt?: Date;

  @IsInt()
  @IsOptional()
  modifiedBy?: number;
}