import React from "react";
import { FaClock, FaUser } from "react-icons/fa";

interface EstimationCardProps {
  projectName: string;
  managerName: string;
  projectType: string;
  logo: string;
  onClick?: () => void;
}

const EstimationCard: React.FC<EstimationCardProps> = ({
  projectName,
  managerName,
  projectType,
  logo,
  onClick,
}) => {
  return (
    <div
      className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 cursor-pointer w-64 flex-shrink-0"
      onClick={onClick}
    >
  
      <div className="relative bg-gray-50 h-28 rounded-t-2xl flex items-center justify-center overflow-hidden">
        <img src={logo} alt={projectName} className="max-h-full max-w-full object-contain" />
        <FaClock className="absolute top-2 right-2 text-gray-400 text-sm" />
      </div>

      <div className="p-4 space-y-1">
        <h2 className="text-lg font-semibold text-blue-700">{projectName}</h2>
        <p className="text-sm font-medium text-blue-700">{projectType}</p>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaUser className="text-gray-500" />
          <span>{managerName}</span>
        </div>
      </div>
    </div>
  );
};

export default EstimationCard;
