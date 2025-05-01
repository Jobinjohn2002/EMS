import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'project_name', type: 'varchar', length: 255 })
  projectName: string;

  @Column({ name: 'client_name', type: 'varchar', length: 255 })
  clientName: string;

  @Column({ name: 'manager_name', type: 'varchar', length: 255 })
  managerName: string;

  @Column({ type: 'int' })
  status: number;

  @Column({ name: 'project_type', type: 'int', nullable: true })
  projectType?: number;
}
