import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Requirement } from '../requirement.entity';

@Entity()
export class SubRequirement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'requirement_id' })
  requirementId: number;

  @Column()
  subrequirement: string;

  @Column()
  description: string;

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


  @ManyToOne(() => Requirement, (req) => req.sub_requirements)
  @JoinColumn({ name: 'requirement_id' })
  requirement: Requirement;
}
