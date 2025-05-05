import { IsInt, IsString, IsBoolean, IsDateString } from 'class-validator';

export class CreateRequirementDto {
  @IsInt()
  estimationId: number;

  @IsString()
  requirement: string;

  @IsBoolean()
  status: boolean;

  @IsInt()
  createdBy: number;

  @IsDateString()
  createdAt: Date;

  @IsInt()
  modifiedBy?: number;

  @IsDateString()
  modifiedAt?: Date;
}
