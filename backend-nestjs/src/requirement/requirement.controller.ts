import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { RequirementService } from './requirement.service';

@Controller('requirement')
export class RequirementController {
  constructor(private readonly requirementService: RequirementService) {}

  @Post()
  create(@Body() createDto: CreateRequirementDto) {
    return this.requirementService.create(createDto);
  }

  @Get()
  findAll() {
    return this.requirementService.findAll();
  }
  @Get('/with-sub')
  findAllWithSubs() {
    return this.requirementService.findAllWithSubRequirements();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requirementService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateRequirementDto) {
    return this.requirementService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requirementService.delete(+id);
  }
}
