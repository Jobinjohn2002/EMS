export interface SubRequirement {
    id: number;
    requirementId: number;
    subrequirement: string;
    description: string;
    status: boolean;
    createdBy: number;
    createdAt: string; // ISO format
    modifiedBy?: number;
    modifiedAt?: string; // ISO format
  }
  