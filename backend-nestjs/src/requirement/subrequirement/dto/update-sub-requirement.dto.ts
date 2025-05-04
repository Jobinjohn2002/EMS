import { PartialType } from '@nestjs/mapped-types';
import { CreateSubRequirementDto } from './create-sub-requirement.dto';

export class UpdateSubRequirementDto extends PartialType(CreateSubRequirementDto) {}
