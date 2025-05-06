import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get('/dropdown')
    async getProjects(): Promise<ProjectDto[]> {
    const projects = await this.projectService.findAll();
    return projects.map(({ id, projectName }) => ({ id, projectName }));
}
  @Get('/projects-estimations')
    async getProjectsWithEstimations() {
    const projects = await this.projectService.getProjectsWithEstimations();
    return projects;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

}
