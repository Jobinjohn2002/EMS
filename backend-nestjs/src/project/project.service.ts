import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { Estimation } from 'src/estimation/estimation.entity';
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Estimation)
    private estimationRepository: Repository<Estimation>,
  ) {}

  create(data: Partial<Project>) {
    const estimation = this.projectRepository.create(data);
    return this.projectRepository.save(estimation);
  }

  findAll() {
    return this.projectRepository.find();
  }

  findOne(id: number) {
    return this.projectRepository.findOneBy({ id });
  }
  
  getProjectsWithEstimations1() {
    return this.projectRepository
      .createQueryBuilder('project')
      .innerJoin(
        qb => qb
          .select('e.*')
          .from('estimation', 'e')
          .distinctOn(['e.project_id']) // Get latest estimation per project
          .orderBy('e.project_id', 'ASC')
          .addOrderBy('e.created_at', 'DESC'),
        'estimation',
        'estimation.project_id = project.id'
      )
      .select([
        'project.id AS id',
        'project.project_name AS project_name',
        'project.manager_name AS manager_name',
        'project.project_type AS project_type',
        'estimation.version_no AS version_no',
        'estimation.status AS estimation_status',
        'estimation.description AS description'
      ])
      .getRawMany();
  }
  async getProjectsWithEstimations() {
    // Get projects where at least one estimation has status = 1
    const subQuery = this.estimationRepository
      .createQueryBuilder('e')
      .select('e.projectId') // Ensure projectId is the correct column name
      .where('e.status != :status', { status: 0 });
  
    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.estimations', 'estimation')
      .where(`project.id IN (${subQuery.getQuery()})`)
      .setParameters(subQuery.getParameters())
      .orderBy('project.id', 'ASC')
      .addOrderBy('estimation.versionNo', 'DESC')
      .getMany();
  
    // Optionally filter out estimations with status !== 1 if you want only active ones
    const filteredProjects = projects.map((p) => ({
      ...p,
      estimations: p.estimations?.filter((e) => e.status !== 0),
    }));
  
    return filteredProjects;
  }
  
  
}
