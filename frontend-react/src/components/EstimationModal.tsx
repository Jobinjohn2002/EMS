// src/components/EstimationModal.tsx
import React, { useState } from 'react';
import { EstimationModel } from '../models/EstimationModel';
import { estimationService } from '../services/estimationService';

interface EstimationModalProps {
  visible: boolean;
  onHide: () => void;
//   onSubmit: (estimation: EstimationModel) => void;
refreshProjects: () => Promise<void>; 
}

// const EstimationModal: React.FC<EstimationModalProps> = ({ visible, onHide, onSubmit }) => {
const EstimationModal: React.FC<EstimationModalProps> = ({ visible, onHide, refreshProjects  }) => {
  const [estimation, setEstimation] = useState<Partial<EstimationModel>>({
    projectType: 'Eseresi',
    // status: 'Draft',
    date: new Date().toISOString().split('T')[0]
  });

  const statusOptions = ['Draft', 'Submitted', 'Approved', 'Rejected'];

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(estimation as EstimationModel);
//     onHide();
//   };
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await estimationService.create(estimation as Omit<EstimationModel, 'id'>);
      await refreshProjects(); // Refresh the list after creation
      onHide();
    } catch (error) {
      console.error("Failed to create estimation:", error);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">New Estimation</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={estimation.projectName || ''}
                onChange={(e) => setEstimation({ ...estimation, projectName: e.target.value })}
                required
              />
            </div>

            {/* Client Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={estimation.clientName || ''}
                onChange={(e) => setEstimation({ ...estimation, clientName: e.target.value })}
                required
              />
            </div>

            {/* Manager Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Manager Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={estimation.managerName || ''}
                onChange={(e) => setEstimation({ ...estimation, managerName: e.target.value })}
                required
              />
            </div>

            {/* Project Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={estimation.projectType || ''}
                onChange={(e) => setEstimation({ ...estimation, projectType: e.target.value })}
                required
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={estimation.date || ''}
                onChange={(e) => setEstimation({ ...estimation, date: e.target.value })}
              />
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={estimation.status || ''}
                // onChange={(e) => setEstimation({ ...estimation, status: e.target.type })}
                onChange={(e) => setEstimation({ ...estimation})}
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={estimation.description || ''}
              onChange={(e) => setEstimation({ ...estimation, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Approved By */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Approved By</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={estimation.approvedBy || ''}
                onChange={(e) => setEstimation({ ...estimation, approvedBy: e.target.value })}
              />
            </div>

            {/* Prepared By */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Prepared By</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={estimation.preparedBy || ''}
                onChange={(e) => setEstimation({ ...estimation, preparedBy: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onHide}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EstimationModal;