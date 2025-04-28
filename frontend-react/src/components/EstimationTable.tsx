// import React from "react";
// import { EstimationModel } from "../models/EstimationModal";

// interface EstimationTableProps {
//   projects: EstimationModel[];
// }

// const EstimationTable: React.FC<EstimationTableProps> = ({ projects }) => {
//   return (
//     <div className="bg-white rounded-lg shadow overflow-x-auto">
//       <table className="min-w-full">
//         <thead className="bg-gray-100 text-gray-700 text-sm">
//           <tr>
//             <th className="py-3 px-4 text-left">Project Name</th>
//             <th className="py-3 px-4 text-left">Client Name</th>
//             <th className="py-3 px-4 text-left">Manager Name</th>
//             <th className="py-3 px-4 text-left">Project Type</th>
//             <th className="py-3 px-4 text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projects.map((project) => (
//             <tr key={project.id} className="border-t text-sm">
//               <td className="py-3 px-4">{project.projectName}</td>
//               <td className="py-3 px-4">{project.clientName}</td>
//               <td className="py-3 px-4">{project.managerName}</td>
//               <td className="py-3 px-4">
//                 <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
//                   {project.projectType}
//                 </span>
//               </td>
//               <td className="py-3 px-4 text-center flex justify-center gap-4">
//                 <button className="text-blue-500 hover:text-blue-700">
//                   <i className="pi pi-pencil"></i>
//                 </button>
//                 <button className="text-red-500 hover:text-red-700">
//                   <i className="pi pi-trash"></i>
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EstimationTable;



// THIS IS SECOND PART OF THE FILE

// // src/components/EstimationTable.tsx
// import React, { useState } from "react";
// import { EstimationModel } from "../models/EstimationModal";
// import EstimationModal from "./EstimationModal";
// import { estimationService } from "../services/estimationService";

// interface EstimationTableProps {
//   projects: EstimationModel[];
// //   onProjectAdded: (project: EstimationModel) => void;
//   refreshProjects: () => Promise<void>;
// }

// // const EstimationTable: React.FC<EstimationTableProps> = ({ projects, onProjectAdded }) => {
// const EstimationTable: React.FC<EstimationTableProps> = ({ projects, refreshProjects }) => {
//   const [modalVisible, setModalVisible] = useState(false);

// //   const handleSubmit = (estimation: EstimationModel) => {
// //     const newProject = {
// //       ...estimation,
// //       id: projects.length + 1 // This should be replaced with actual ID from backend
// //     };
// //     onProjectAdded(newProject);
// //   };
//   const handleDelete = async (id: number) => {
//     try {
//       await estimationService.delete(id);
//       await refreshProjects(); // Refresh the list after deletion
//     } catch (error) {
//       console.error("Failed to delete project:", error);
//     }
//   };
//   return (
//     <div className="bg-white rounded-lg shadow overflow-x-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Projects - Estimation</h2>
//         <button
//           onClick={() => setModalVisible(true)}
//           className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <i className="pi pi-plus mr-2"></i>
//           New Estimation
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Project Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Client Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Manager Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Project Type
//               </th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {projects.map((project) => (
//               <tr key={project.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {project.projectName}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {project.clientName}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {project.managerName}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                     {project.projectType}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                   <div className="flex justify-center space-x-4">
//                     <button className="text-blue-600 hover:text-blue-900">
//                       <i className="pi pi-pencil"></i>
//                     </button>
//                     {/* <button className="text-red-600 hover:text-red-900">
//                       <i className="pi pi-trash"></i>
//                     </button> */}
//                     <button 
//                         className="text-red-600 hover:text-red-900"
//                         onClick={() => handleDelete(project.id)}
//                     >
//                         <i className="pi pi-trash"></i>
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

      

//       {modalVisible && (
//         <EstimationModal
//           visible={modalVisible}
//           onHide={() => setModalVisible(false)}
//           refreshProjects={refreshProjects} // Pass this to the modal
//         />
//       )}
//     </div>
//   );
// };

// export default EstimationTable;



// THIS IS THIRD PART OF THE FILE

// src/components/EstimationTable.tsx
import React, { useState } from "react";
import { EstimationModel } from "../models/EstimationModal";
import EstimationModal from "./EstimationModal";
import { estimationService } from "../services/estimationService";

interface EstimationTableProps {
  projects: EstimationModel[];
  refreshProjects: () => Promise<void>;
}

const EstimationTable: React.FC<EstimationTableProps> = ({ projects, refreshProjects }) => {
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">excelencia</h2>
        <h3 className="text-md text-gray-600">People THAT I Services Hospitals</h3>
      </div>

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
                      <i className="pi pi-check mr-1"></i>
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <i className="pi pi-square"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h3 className="text-md font-medium mb-2">Requirement & Assumption</h3>
        <div className="flex space-x-4 mb-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Estimation
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Summary
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Billing Milestone
          </button>
        </div>
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

export default EstimationTable;