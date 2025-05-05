// src/pages/VersionPage.tsx
import { useEffect, useState } from "react";
import { estimationService } from "../services/estimationService";
import { EstimationModel } from "../models/EstimationModel";
import VersionTable from "../components/estimation/VersionTable";

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
      <VersionTable projects={projects} refreshProjects={refreshProjects} />
    </div>
  );
};

export default VersionPage;
