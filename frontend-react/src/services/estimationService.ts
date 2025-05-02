import { Estimation } from '../models/Estimation';
import { EstimationModel } from '../models/EstimationModel';
import API from './api';

export const estimationService = {

getAll: async (): Promise<EstimationModel[]> => {
    const response = await API.get('/estimation');
    return response.data;
  },
  
  getById: async (id: number): Promise<EstimationModel> => {
    const response = await API.get(`/estimation/${id}`);
    return response.data;
  },
  
  create: async (estimation: Omit<EstimationModel, 'id'>): Promise<EstimationModel> => {
    const response = await API.post('/estimation', estimation);
    return response.data;
  },
  createEstimation: async (estimation: Omit<Estimation, 'id'>): Promise<Estimation> => {
    const response = await API.post('/estimation', estimation);
    return response.data;
  },
  
  update: async (id: number, estimation: Partial<EstimationModel>): Promise<EstimationModel> => {
    const response = await API.put(`/estimation/${id}`, estimation);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await API.delete(`/estimation/${id}`);
  }
};
