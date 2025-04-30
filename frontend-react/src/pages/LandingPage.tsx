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

const LandingPage: React.FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const togglePopup = (): void => {
    setIsOpen(!isOpen);
  };

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
          <button onClick={togglePopup} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800">
            + New Estimation
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg relative w-96" style={{ width: '60%' }}>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Version</h2>

              <form>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Projects</label>
                    <select className="text-sm py-1 mt-1 block w-full h-8 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                      <option>Select Projects</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Version No</label>
                    <input
                      type="text"
                      className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="text"
                      placeholder="MM/DD/YYYY"
                      className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Approved by</label>
                    <input
                      type="text"
                      className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                      <option>Select</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Prepared by</label>
                    <select className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                      <option>Select</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    placeholder="Write a Description"
                    className="resize-none text-sm py-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-24"
                  ></textarea>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>

              <button
                onClick={togglePopup}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        )}


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
