import React from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  description: string;
}

const ProjectsDashboard: React.FC = () => {
  const navigate = useNavigate();

  const projects: Project[] = [
    { id: 1, name: "Similrz", description: "Requirement Estimation" },
    { id: 2, name: "ProjectX", description: "Time Tracking System" },
  ];

  const handleCardClick = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => handleCardClick(project.id)}
          className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border border-gray-200"
        >
          <h2 className="text-xl">{project.name}</h2>
          <p className="text-gray-500 mt-2">{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectsDashboard;
