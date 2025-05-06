import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Requirement } from './requirement.entity';

@Injectable()
export class RequirementService {
  constructor(
    @InjectRepository(Requirement)
    private requirementRepository: Repository<Requirement>,
  ) {}

  async create(data: Partial<Requirement>) {
    // Exclude system-generated fields from incoming data
    const { createdAt, modifiedAt, estimationId, createdBy, modifiedBy, ...safeData } = data;

    // Generate next estimationId
    const lastRequirement = await this.requirementRepository
      .createQueryBuilder('r')
      .orderBy('r.estimationId', 'DESC')
      .getOne();
    const nextEstimationId = lastRequirement?.estimationId
      ? lastRequirement.estimationId + 1
      : 1;

    // Generate next createdBy (replace with actual auth user ID in real apps)
    const lastCreatedBy = await this.requirementRepository
      .createQueryBuilder('r')
      .orderBy('r.createdBy', 'DESC')
      .getOne();
    const nextCreatedBy = typeof lastCreatedBy?.createdBy === 'number'
      ? lastCreatedBy.createdBy + 1
      : 101;

    const requirement = this.requirementRepository.create({
      ...safeData,
      estimationId: nextEstimationId,
      createdBy: nextCreatedBy,
      modifiedBy: nextCreatedBy, // initially same as createdBy
    });

    return await this.requirementRepository.save(requirement);
  }

  findAll() {
    return this.requirementRepository.find({
      where: { status: true },
    });
  }

  async findAllWithSubRequirements() {
    const rows = await this.requirementRepository
      .createQueryBuilder('r')
      .leftJoin('r.sub_requirements', 'sr')
      .select([
        'r.id AS requirement_id',
        'r.requirement AS requirement',
        'r.status AS requirement_status',
        'sr.id AS sub_requirement_id',
        'sr.subrequirement AS sub_requirement',
        'sr.status AS sub_requirement_status',
      ])
      .getRawMany();

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
  }

  findOne(id: number) {
    return this.requirementRepository.findOne({
      where: { id },
      relations: ['sub_requirements'],
    });
  }

  async update(id: number, data: Partial<Requirement>) {
    const { createdAt, modifiedAt, createdBy, ...updateData } = data;

    // Generate next modifiedBy (replace with actual user ID in real apps)
    const lastModifiedBy = await this.requirementRepository
      .createQueryBuilder('r')
      .orderBy('r.modifiedBy', 'DESC')
      .getOne();

    const nextModifiedBy = typeof lastModifiedBy?.modifiedBy === 'number'
      ? lastModifiedBy.modifiedBy + 1
      : 101;

    await this.requirementRepository.update(id, {
      ...updateData,
      modifiedBy: nextModifiedBy,
    });

    return this.findOne(id);
  }

  async delete(id: number) {
    // Generate next modifiedBy (for audit)
    const lastModifiedBy = await this.requirementRepository
      .createQueryBuilder('r')
      .orderBy('r.modifiedBy', 'DESC')
      .getOne();
  
    const nextModifiedBy = typeof lastModifiedBy?.modifiedBy === 'number'
      ? lastModifiedBy.modifiedBy + 1
      : 101;
  
    await this.requirementRepository.update(id, {
      status: false,
      modifiedBy: nextModifiedBy,
    });
  
    return this.findOne(id);
  }
  
}
