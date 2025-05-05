import { SubRequirement } from "./SubRequirement";

export interface Requirement {
    id: number;
    estimationId: number;
    requirement: string;
    status: boolean;
    createdBy: number;
    createdAt: string; // ISO format
    modifiedBy?: number;
    modifiedAt?: string; // ISO format
    sub_requirements?: SubRequirement[]; // Optional: included if joined
  }