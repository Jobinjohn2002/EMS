// src/pages/VersionPage.tsx
import { useEffect, useState } from "react";
import EstimationTable from "../components/EstimationTable";
import { estimationService } from "../services/estimationService";
import { EstimationModel } from "../models/EstimationModel";

const VersionPage = () => {
  const [projects, setProjects] = useState<EstimationModel[]>([]);

  const refreshProjects = async () => {
    const data = await estimationService.getAll(); // Replace with your actual method
    setProjects(data);
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  return (
    <div className="p-4">
      <EstimationTable projects={projects} refreshProjects={refreshProjects} />
    </div>
  );
};

export default VersionPage;
