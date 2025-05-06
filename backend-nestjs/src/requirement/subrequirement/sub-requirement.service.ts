import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubRequirement } from './sub-requirement.entity';
import { CreateSubRequirementDto } from './dto/create-sub-requirement.dto';
import { UpdateSubRequirementDto } from './dto/update-sub-requirement.dto';

@Injectable()
export class SubRequirementService {
  constructor(
    @InjectRepository(SubRequirement)
    private readonly subRequirementRepo: Repository<SubRequirement>,
  ) {}

  create(createDto: CreateSubRequirementDto) {
    const subReq = this.subRequirementRepo.create(createDto);
    return this.subRequirementRepo.save(subReq);
  }

  findAll() {
    return this.subRequirementRepo.find({ relations: ['requirement'] });
  }

  findOne(id: number) {
    return this.subRequirementRepo.findOne({
      where: { id },
      relations: ['requirement'],
    });
  }

  update(id: number, updateDto: UpdateSubRequirementDto) {
    return this.subRequirementRepo.update(id, updateDto);
  }

  async delete(id: number) {
    return this.subRequirementRepo.delete(id);
  }
}
