// src/components/EstimationTable.tsx

import React from "react"; // Adjust the path to your model
import { EstimationModel } from "../../models/EstimationModel";

interface EstimationTableProps {
  projects: EstimationModel[];
  onEdit: (projectId: number) => void;
  onDelete: (projectId: number) => void;
}

const EstimationTable: React.FC<EstimationTableProps> = ({
  projects,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wide">
              Project Name
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wide">
              Client Name
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wide">
              Manager Name
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wide">
              Project Type
            </th>
            <th className="px-4 py-2 text-center font-medium text-gray-700 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 whitespace-nowrap text-gray-800 font-medium">
                {p.projectName}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                {p.clientName}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                {p.managerName}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                {p.projectType == "1"
                  ? "Internal"
                  : p.projectType == "2"
                  ? "External"
                  : "Unknown"}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-center flex justify-center space-x-3">
                <button
                  onClick={() => onEdit(p.id)}
                  className="hover:text-blue-600 transition"
                >
                  <i className="pi pi-pencil text-sm"></i>
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="hover:text-red-600 transition"
                >
                  <i className="pi pi-trash text-sm"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstimationTable;
