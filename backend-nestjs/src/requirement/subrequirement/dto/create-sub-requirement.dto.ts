import { IsInt, IsString, IsBoolean, IsDateString } from 'class-validator';

export class CreateSubRequirementDto {
  @IsInt()
  requirementId: number;

  @IsString()
  subrequirement: string;

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
