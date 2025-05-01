import React from "react";

interface ProjectCardProps {
  title: string;
  logo?: string;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, logo, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
    >
      {logo && <img src={logo} alt={title} className="h-12 mb-4" />}
      <h2 className="text-md font-semibold text-gray-800">{title}</h2>
    </div>
  );
};

export default ProjectCard;

