import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { SubRequirement } from './subrequirement/sub-requirement.entity';

@Entity()
export class Requirement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'estimation_id' })
  estimationId: number;

  @Column({ type: 'varchar' })
  requirement: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ name: 'created_by' })
  createdBy: number;

  @Column({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @Column({ name: 'modified_by', nullable: true })
  modifiedBy?: number;

  @Column({ name: 'modified_at', type: 'datetime', nullable: true })
  modifiedAt?: Date;

  @OneToMany(() => SubRequirement, (sub) => sub.requirement)
  sub_requirements: SubRequirement[]
}
