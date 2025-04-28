import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import EstimationCard from "../components/EstimationCard";
import EstimationTable from "../components/EstimationTable";
import { estimationService } from "../services/estimationService";
import { EstimationModel } from "../models/EstimationModal";

const mockData = [
  { id: 1, projectName: "Similrz", clientName: "Fabien", managerName: "Gidhin Shaji", projectType: "External" },
  { id: 2, projectName: "SANMINA", clientName: "Micheal", managerName: "Suresh Venkatraman", projectType: "External" },
  { id: 3, projectName: "Hilton", clientName: "John", managerName: "Gidhin Shaji", projectType: "External" },
  { id: 4, projectName: "Complete Solar", clientName: "Daniel", managerName: "Gidhin Shaji", projectType: "External" },
  { id: 5, projectName: "KUBA", clientName: "Jack", managerName: "Gidhin Shaji", projectType: "External" },
];

const LandingPage: React.FC  = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [projects, setProjects] = useState<EstimationModel[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshProjects = async () => {
    setLoading(true);
    try {
      const data = await estimationService.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Projects - Estimation</h2>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800">
            + New Estimation
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setViewType("grid")}
            className={`flex items-center gap-2 text-sm ${viewType === "grid" ? "text-blue-700 font-semibold" : "text-gray-500"}`}
          >
            <i className="pi pi-th-large"></i> Grid
          </button>
          <button
            onClick={() => setViewType("list")}
            className={`flex items-center gap-2 text-sm ${viewType === "list" ? "text-blue-700 font-semibold" : "text-gray-500"}`}
          >
            <i className="pi pi-list"></i> List
          </button>
        </div>

        {viewType === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockData.map((project) => (
              <EstimationCard
                key={project.id}
                projectName={project.projectName}
                projectType={project.projectType}
                managerName={project.managerName}
              />
            ))}
          </div>
        ) : (
        //   <EstimationTable projects={mockData} />
        <EstimationTable 
          projects={projects} 
          refreshProjects={refreshProjects} 
        />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
