import React from "react";

interface EstimationCardProps {
  projectName: string;
  projectType: string;
  managerName: string;
}

const EstimationCard: React.FC<EstimationCardProps> = ({ projectName, projectType, managerName }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
      <div className="mb-4">
        <img src="/placeholder.png" alt="Project Logo" className="h-20 mx-auto" />
      </div>
      <div className="flex items-center justify-between">
      <h3 className="text-lg font-bold text-blue-700">{projectName}</h3>
      <button className="bg-transparent border-none outline-none focus:outline-none">
        <img src="./src/assets/history.svg" alt="history" className="w-5 h-5" />
      </button>
      </div>
      <p className="text-sm text-gray-500">{projectType}</p>
      <div className="mt-4 text-xs text-gray-500">
        <p>👤 {managerName}</p>
      </div>
    </div>
  );
};

export default EstimationCard;
