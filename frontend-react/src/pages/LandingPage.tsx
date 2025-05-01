import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EstimationCard from "../components/EstimationCard";
import { estimationService } from "../services/estimationService";
import { EstimationModel } from "../models/EstimationModal";
import excelLogo from "../assets/excel.png";
import simLogo from "../assets/sim.png";
import hilLogo from "../assets/hil.png";
import csLogo from "../assets/cs.png";
import sanLogo from "../assets/san.png";
import kbLogo from "../assets/kb.png";
import 'primeicons/primeicons.css';

const mockData = [
  { id: 1, projectName: "Similrz",     clientName: "Fabien",  managerName: "Gidhin Shaji",       projectType: "Internal", logo: simLogo },
  { id: 2, projectName: "Hilton",      clientName: "John",    managerName: "Gidhin Shaji",       projectType: "External", logo: hilLogo },
  { id: 3, projectName: "Complete Solar", clientName: "Daniel", managerName: "Gidhin Shaji",     projectType: "External", logo: csLogo },
  { id: 4, projectName: "Sanmina",     clientName: "Micheal", managerName: "Suresh Venkatraman", projectType: "External", logo: sanLogo },
  { id: 5, projectName: "KUBA",        clientName: "Jack",    managerName: "Gidhin Shaji",       projectType: "External", logo: kbLogo },
];

const LandingPage: React.FC = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [projects, setProjects] = useState<EstimationModel[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const refreshProjects = async () => {
    setLoading(true);
    try {
      const data = await estimationService.getAll();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  const handleDelete = (id: number) => {
    // TODO: integrate real delete logic
    console.log("Deleting project with id", id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-0 m-0">
      {/* Logo outside the white container */}
      <div className="p-6">
        <img src={excelLogo} alt="Excelencia Logo" className="h-10" />
      </div>

      {/* White container fills remaining height */}
      <div className="flex-1 w-full bg-white shadow-lg p-8 flex flex-col">
        {/* Title and New button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Projects - Estimation</h1>
          <button
            onClick={() => navigate("/create-estimation")}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition"
          >
            + New Estimation
          </button>
        </div>

        {/* View toggles below title, left-aligned with spacing */}
        <div className="flex items-center space-x-8 mb-8">
          <button
            onClick={() => setViewType("grid")}
            className={`flex items-center gap-2 text-sm transition ${
              viewType === "grid" ? "text-blue-700 font-semibold" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <i className="pi pi-th-large text-base"></i>
            <span>Grid</span>
          </button>
          <button
            onClick={() => setViewType("list")}
            className={`flex items-center gap-2 text-sm transition ${
              viewType === "list" ? "text-blue-700 font-semibold" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <i className="pi pi-list text-base"></i>
            <span>List</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {viewType === "grid" ? (
            <div className="flex flex-wrap gap-6">
              {mockData.map((p) => (
                <EstimationCard
                  key={p.id}
                  projectName={p.projectName}
                  managerName={p.managerName}
                  projectType={p.projectType}
                  logo={p.logo}
                  onClick={() => navigate(`/project/${p.projectName.toLowerCase()}`)}
                />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wide">Project Name</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wide">Client Name</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wide">Manager Name</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wide">Project Type</th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockData.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 whitespace-nowrap text-gray-800 font-medium">{p.projectName}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-600">{p.clientName}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-600">{p.managerName}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-600">{p.projectType}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-center flex justify-center space-x-3">
                        <button
                          onClick={() => navigate(`/create-estimation/${p.id}`)}
                          aria-label="Edit"
                          className="hover:text-blue-600 transition"
                        >
                          <i className="pi pi-pencil text-sm"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          aria-label="Delete"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
