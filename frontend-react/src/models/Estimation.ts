// models/Estimation.ts
export interface Estimation {
    id: number;
    projectId?: number;
    date?: string; // ISO format string (e.g., '2025-05-01')
    status?: number;
    description?: string;
    approvedBy?: string;
    preparedBy: number;
    versionNo?: string;
    createdAt?: string; // ISO format string
    modifiedAt?: string; // ISO format string
    modifiedBy?: number;
  }
  