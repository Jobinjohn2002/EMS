// src/models/EstimationModal.ts
export interface EstimationModel {
  id: number;
  projectName: string;
  clientName: string;
  managerName: string;
  projectType: string;
  date?: string;
  status?: number;
  description?: string;
  approvedBy?: string;
  preparedBy?: string;
  versionNo?: string;
}