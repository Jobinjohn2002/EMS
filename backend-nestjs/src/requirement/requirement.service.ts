import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Requirement } from './requirement.entity';

@Injectable()
export class RequirementService {
  requirementRepo: any;
  constructor(
    @InjectRepository(Requirement)
    private requirementRepository: Repository<Requirement>,
  ) {}

  create(data: Partial<Requirement>) {
    const requirement = this.requirementRepository.create(data);
    return this.requirementRepository.save(requirement);
  }

  findAll() {
    return this.requirementRepository.find();
  }
  findAllWithSubRequirements() {
    return this.requirementRepository
      .createQueryBuilder('r') // requirement table alias
      .leftJoin('sub_requirement', 'sr', 'r.id = sr.requirement_id') // fix join order here
      .select([
        'r.id AS requirement_id',
        'r.requirement AS requirement',
        'r.status AS requirement_status',
        'sr.id AS sub_requirement_id',
        'sr.subrequirement AS sub_requirement',
        'sr.status AS sub_requirement_status',
      ])
      .getRawMany()
      .then((rows) => {
        const grouped = rows.reduce((acc, row) => {
          const reqId = row.requirement_id;
  
          if (!acc[reqId]) {
            acc[reqId] = {
              id: reqId,
              requirement: row.requirement,
              status: row.requirement_status,
              sub_requirements: [],
            };
          }
  
          if (row.sub_requirement_id) {
            acc[reqId].sub_requirements.push({
              id: row.sub_requirement_id,
              sub_requirement: row.sub_requirement,
              status: row.sub_requirement_status,
            });
          }
  
          return acc;
        }, {});
  
        return Object.values(grouped);
      });
  }
  
  
  findOne(id: number) {
    return this.requirementRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<Requirement>) {
    return this.requirementRepository.update(id, data);
  }

  delete(id: number) {
    return this.requirementRepository.delete(id);
  }
}
