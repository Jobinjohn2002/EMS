import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Requirement } from '../requirement.entity';

@Entity()
export class SubRequirement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'requirement_id' })
  requirementId: number;

  @Column()
  subrequirement: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ name: 'created_by' })
  createdBy: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'modified_by', nullable: true })
  modifiedBy?: number;

  @Column({ type: 'timestamp', nullable: true })
  modifiedAt?: Date;

  @ManyToOne(() => Requirement, (req) => req.sub_requirements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'requirement_id' })
  requirement: Requirement;
}
