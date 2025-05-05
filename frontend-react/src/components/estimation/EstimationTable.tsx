// src/components/EstimationTable.tsx

import React from "react";
import { EstimationModel } from "../../models/EstimationModel"; // Adjust the path to your model

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
    <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200"> {/* Added border and shadow for outer container */}
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50"> {/* Changed header background to a lighter gray */}
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-700 uppercase tracking-wide"> {/* Increased padding slightly */}
              Project Name
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700 uppercase tracking-wide"> {/* Increased padding slightly */}
              Client Name
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700 uppercase tracking-wide"> {/* Increased padding slightly */}
              Manager Name
            </th>
            <th className="px-4 py-3 text-center font-medium text-gray-700 uppercase tracking-wide"> {/* Centered Project Type header */}
              Project Type
            </th>
            <th className="px-4 py-3 text-center font-medium text-gray-700 uppercase tracking-wide"> {/* Increased padding slightly */}
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 whitespace-nowrap text-gray-800 font-medium"> {/* Increased padding slightly */}
                {p.projectName}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600"> {/* Increased padding slightly */}
                {p.clientName}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600"> {/* Increased padding slightly */}
                {p.managerName}
              </td>
              {/* Project Type Cell with conditional highlighting */}
              <td className="px-4 py-3 whitespace-nowrap text-center"> {/* Increased padding slightly, centered content */}
                <div className="inline-flex items-center space-x-2"> {/* Use flex to align pills */}
                  {/* External Pill */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-base font-normal ${
                      p.projectType == "2"
                        ? "bg-blue-100 text-blue-800" // Highlight for External
                        : "text-blue-800" // Bordered for other types
                    }`}
                  >
                    External
                  </span>
                  {/* Internal Pill */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-base font-normal ${
                      p.projectType == "1"
                        ? "bg-blue-100 text-blue-800" // Highlight for Internal
                        : "text-blue-800" // Bordered for other types
                    }`}
                  >
                    Internal
                  </span>
                </div>
              </td>
              {/* Actions Cell */}
              <td className="px-4 py-3 whitespace-nowrap text-center flex justify-center items-center space-x-3"> {/* Increased padding slightly, centered content and icons vertically */}
                <button
                  onClick={() => onEdit(p.id)}
                  className="text-blue-500 hover:text-blue-600 transition" // Adjusted default color
                  title="Edit" // Added title for accessibility
                >
                  <i className="pi pi-pencil text-base"></i>
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="text-red-500 hover:text-red-600 transition" // Adjusted default color
                  title="Delete" // Added title for accessibility
                >
                  <i className="pi pi-trash text-base"></i>
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