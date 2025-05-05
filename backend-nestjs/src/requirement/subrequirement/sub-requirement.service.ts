import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubRequirement } from './sub-requirement.entity';

@Injectable()
export class SubRequirementService {
  constructor(
    @InjectRepository(SubRequirement)
    private subRequirementRepo: Repository<SubRequirement>,
  ) {}

  create(data: Partial<SubRequirement>) {
    const sub = this.subRequirementRepo.create(data);
    return this.subRequirementRepo.save(sub);
  }

  findAll() {
    return this.subRequirementRepo.find();
  }

  findOne(id: number) {
    return this.subRequirementRepo.findOneBy({ id });
  }

  update(id: number, data: Partial<SubRequirement>) {
    return this.subRequirementRepo.update(id, data);
  }

  delete(id: number) {
    return this.subRequirementRepo.delete(id);
  }
}
