import { Requirement } from '../models/Requirement';
import { SubRequirement } from '../models/SubRequirement';
import API from './api';

export const requirementService = {
  getAll: async (): Promise<Requirement[]> => {
    const response = await API.get('/requirement');
    return response.data;
  },

  getAllWithSubRequirements: async (): Promise<any[]> => {
    const response = await API.get('/requirement/with-sub');
    return response.data;
  },

  getById: async (id: number): Promise<Requirement> => {
    const response = await API.get(`/requirement/${id}`);
    return response.data;
  },

  create: async (
    requirement: Omit<Requirement, 'id'>, 
    subRequirements: Omit<SubRequirement, 'id' | 'requirement'>[] // SubRequirements to be created
  ): Promise<Requirement> => {
    const { createdAt, modifiedAt, ...safeRequirement } = requirement;
    const response = await API.post('/requirement', {
      ...safeRequirement,
      subRequirements: subRequirements // Pass subRequirements data
    });
    return response.data;
  },

  update: async (
    id: number, 
    requirement: Partial<Requirement>, 
    subRequirements?: Omit<SubRequirement, 'id' | 'requirement'>[] // SubRequirements to be updated
  ): Promise<Requirement> => {
    const response = await API.put(`/requirement/${id}`, {
      ...requirement,
      subRequirements: subRequirements // Pass subRequirements data
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await API.delete(`/requirement/${id}`);
  },

  // Sub Requirement
  getAllSubRequirements: async (): Promise<SubRequirement[]> => {
    const response = await API.get('/sub-requirement');
    return response.data;
  },

  getSubRequirementById: async (id: number): Promise<SubRequirement> => {
    const response = await API.get(`/sub-requirement/${id}`);
    return response.data;
  },

  // Create sub-requirement
  createSubRequirement: async (requirementId: number, subrequirement: string, createdBy: number): Promise<SubRequirement> => {
    const response = await API.post('/sub-requirement', {
      requirementId, 
      subrequirement,
      status: true, // default value
      createdBy,
    });
    return response.data;
  },

  updateSubRequirement: async (id: number, subRequirement: Partial<SubRequirement>): Promise<SubRequirement> => {
    const response = await API.put(`/sub-requirement/${id}`, subRequirement);
    return response.data;
  },

  deleteSubRequirement: async (id: number): Promise<void> => {
    await API.delete(`/sub-requirement/${id}`);
  }
};

export default requirementService;
