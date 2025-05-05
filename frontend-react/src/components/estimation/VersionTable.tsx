// src/components/VersionTable.tsx
import React, { useState } from "react";
import { EstimationModel } from "../../models/EstimationModel";
import EstimationModal from "./EstimationModal";
import { estimationService } from "../../services/estimationService";
import Header from "../Header";

interface EstimationTableProps {
  projects: EstimationModel[];
  refreshProjects: () => Promise<void>;
}

const VersionTable: React.FC<EstimationTableProps> = ({ projects, refreshProjects }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      await estimationService.delete(id);
      await refreshProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto p-4">
      <Header />
      <h2 className="text-lg font-semibold mb-4">Version History</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Version
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prepared by
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Approved by
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {project.versionNo}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.preparedBy}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.approvedBy}
                </td>
                {/* <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${project.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                      project.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {project.status}
                  </span>
                </td> */}
                <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${project.status === 2 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {project.status === 2 ? '(Approved)' : '(Pending)'}
                    </span>
                    </td>
                <td className="px-4 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {project.description}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center space-x-4">
                    <button className="text-blue-600 hover:text-blue-900">
                        <i className="pi pi-pencil text-sm"></i>
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                    <i className="pi pi-trash text-sm"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Save
        </button>
      </div>

      {modalVisible && (
        <EstimationModal
          visible={modalVisible}
          onHide={() => setModalVisible(false)}
          refreshProjects={refreshProjects}
        />
      )}
    </div>
  );
};

export default VersionTable;