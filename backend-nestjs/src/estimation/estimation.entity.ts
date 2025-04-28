// estimation.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Estimation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  date?: Date;

  @Column({ nullable: true })
  status?: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'approved_by', nullable: true })
  approvedBy?: string;

  @Column({ name: 'prepared_by'})
  preparedBy: number;

  @Column({ name: 'version_no', nullable: true })
  versionNo?: string;

  @Column({ name: 'created_at', type: 'datetime', nullable: true })
  createdAt?: Date;;

  @Column({ name: 'modified_at', type: 'datetime', nullable: true })
  modifiedAt?: Date;

  @Column({ name: 'modified_by', nullable: true })
  modifiedBy?: number;
}