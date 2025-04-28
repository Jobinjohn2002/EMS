import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estimation } from './estimation.entity';

@Injectable()
export class EstimationService {
  constructor(
    @InjectRepository(Estimation)
    private estimationRepository: Repository<Estimation>,
  ) {}

  create(data: Partial<Estimation>) {
    const estimation = this.estimationRepository.create(data);
    return this.estimationRepository.save(estimation);
  }

  findAll() {
    return this.estimationRepository.find();
  }

  findOne(id: number) {
    return this.estimationRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<Estimation>) {
    return this.estimationRepository.update(id, data);
  }

  delete(id: number) {
    return this.estimationRepository.delete(id);
  }
}
