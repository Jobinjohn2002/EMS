import { EstimationModel } from '../models/EstimationModal';
import API from './api';

export const estimationService = {
//   getAll: () => API.get('/estimation'),
//   getById: (id: number) => API.get(`/estimation/${id}`),
//   create: (payload: any) => API.post('/estimation', payload),
//   update: (id: number, payload: any) => API.put(`/estimation/${id}`, payload),
//   delete: (id: number) => API.delete(`/estimation/${id}`),

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
  
  update: async (id: number, estimation: Partial<EstimationModel>): Promise<EstimationModel> => {
    const response = await API.put(`/estimation/${id}`, estimation);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await API.delete(`/estimation/${id}`);
  }
};
