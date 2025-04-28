import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateEstimationDto } from './dto/create-estimation.dto';
import { UpdateEstimationDto } from './dto/update-estimation.dto';
import { EstimationService } from './estimation.service';

@Controller('estimation')
export class EstimationController {
  constructor(private readonly estimationService: EstimationService) {}

  @Post()
  create(@Body() createEstimationDto: CreateEstimationDto) {
    return this.estimationService.create(createEstimationDto);
  }

  @Get()
  findAll() {
    return this.estimationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estimationService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEstimationDto: UpdateEstimationDto) {
    return this.estimationService.update(+id, updateEstimationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estimationService.delete(+id);
  }
}
