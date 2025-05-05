import { ProjectModel } from '../models/Project';
import API from './api';

export const projectService = {

getAll: async (): Promise<ProjectModel[]> => {
    const response = await API.get('/project/dropdown');
    return response.data;
  },
  getProjectEstimations: async ()=> {
    const response = await API.get('/project/projects-estimations');
    return response.data;
  },
  
  getById: async (id: number): Promise<ProjectModel> => {
    const response = await API.get(`/project/${id}`);
    return response.data;
  },
  
  create: async (project: Omit<ProjectModel, 'id'>): Promise<ProjectModel> => {
    const response = await API.post('/project', project);
    return response.data;
  },
  
  update: async (id: number, project: Partial<ProjectModel>): Promise<ProjectModel> => {
    const response = await API.put(`/project/${id}`, project);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await API.delete(`/project/${id}`);
  }
};
