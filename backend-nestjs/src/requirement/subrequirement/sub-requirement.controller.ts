import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateSubRequirementDto } from './dto/create-sub-requirement.dto';
import { UpdateSubRequirementDto } from './dto/update-sub-requirement.dto';
import { SubRequirementService } from './sub-requirement.service';

@Controller('sub-requirement')
export class SubRequirementController {
  constructor(private readonly subRequirementService: SubRequirementService) {}

  @Post()
  create(@Body() createDto: CreateSubRequirementDto) {
    return this.subRequirementService.create(createDto);
  }

  @Get()
  findAll() {
    return this.subRequirementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subRequirementService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateSubRequirementDto) {
    return this.subRequirementService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subRequirementService.delete(+id);
  }
}
