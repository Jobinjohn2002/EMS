import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EstimationCard from "../components/EstimationCard";
import { estimationService } from "../services/estimationService";
import { EstimationModel } from "../models/EstimationModel";
import simLogo from "../assets/sim.png";
import hilLogo from "../assets/hil.png";
import csLogo from "../assets/cs.png";
import sanLogo from "../assets/san.png";
import kbLogo from "../assets/kb.png";
import "primeicons/primeicons.css";
import Header from "../components/Header";
import { projectService } from "../services/projectService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const mockData = [
  {
    id: 1,
    projectName: "Similrz",
    clientName: "Fabien",
    managerName: "Gidhin Shaji",
    projectType: "Internal",
    logo: simLogo,
  },
  {
    id: 2,
    projectName: "Hilton",
    clientName: "John",
    managerName: "Gidhin Shaji",
    projectType: "External",
    logo: hilLogo,
  },
  {
    id: 3,
    projectName: "Complete Solar",
    clientName: "Daniel",
    managerName: "Gidhin Shaji",
    projectType: "External",
    logo: csLogo,
  },
  {
    id: 4,
    projectName: "Sanmina",
    clientName: "Micheal",
    managerName: "Suresh Venkatraman",
    projectType: "External",
    logo: sanLogo,
  },
  {
    id: 5,
    projectName: "KUBA",
    clientName: "Jack",
    managerName: "Gidhin Shaji",
    projectType: "External",
    logo: kbLogo,
  },
];

const LandingPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [projects, setProjects] = useState<EstimationModel[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dropdownProjects, setDropdownProjects] = useState<
    { id: number; name: string }[]
  >([]);
  const statusOptions = [
    { id: 1, label: "Pending" },
    { id: 2, label: "Approved" },
  ];
  const preparedByOptions = [
    { id: 1, label: "Vijay" },
    { id: 2, label: "Jagadish" },
    { id: 3, label: "Jobin" },
  ];
  // const togglePopup = (): void => {
  //   setIsOpen(!isOpen);
  // };

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
  const handleSave = async () => {
    try {
      navigate("/version-history");
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  useEffect(() => {
    refreshProjects();

    // projectService.getAll().then((data) => {
    //   const mappedProjects = data
    //     .filter((project) => project.id !== undefined)
    //     .map((project) => ({
    //       id: project.id as number,
    //       name: project.projectName,
    //     }));

    //   setDropdownProjects(mappedProjects);
    // }).catch((error) => {
    //   console.error("Failed to load dropdown projects", error);
    // });
  }, []);

  const togglePopup = (): void => {
    setIsOpen(!isOpen);

    // Only fetch projects when the popup is opened
    if (!isOpen) {
      projectService
        .getAll()
        .then((data) => {
          const mappedProjects = data
            .filter((project) => project.id !== undefined) // Filter out projects with undefined id
            .map((project) => ({
              id: project.id as number,
              name: project.projectName,
            }));

          setDropdownProjects(mappedProjects);
        })
        .catch((error) => {
          console.error("Failed to load dropdown projects", error);
        });
    }
  };

  const handleDelete = (id: number) => {
    console.log("Deleting project with id", id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Projects - Estimation</h2>
          <button
            onClick={togglePopup}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800"
          >
            + New Estimation
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              className="bg-white rounded-xl p-6 shadow-lg relative w-96"
              style={{ width: "60%" }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Version
              </h2>

              <form>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Projects
                    </label>
                    <select className="text-sm py-1 mt-1 block w-full h-8 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                      <option>Select Projects</option>
                      {dropdownProjects.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                          {proj.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Version No
                    </label>
                    <input
                      type="text"
                      className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="text"
                      placeholder="MM/DD/YYYY"
                      className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date: Date | null) => setSelectedDate(date)}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="MM/DD/YYYY"
                      // Enable Month and Year dropdowns
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" // Use native select elements
                      // Apply Tailwind classes to the input part
                      className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      // Add a custom class to the calendar popup wrapper
                      calendarClassName="tailwind-datepicker"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Approved by
                    </label>
                    <input
                      type="text"
                      className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                      <option>Select</option>
                      {statusOptions.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Prepared by
                    </label>
                    <select className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                      <option>Select</option>
                      {preparedByOptions.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
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
                    onClick={handleSave}
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
            className={`flex items-center gap-2 text-sm transition ${
              viewType === "grid"
                ? "text-blue-700 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <i className="pi pi-th-large text-base"></i>
            <span>Grid</span>
          </button>
          <button
            onClick={() => setViewType("list")}
            className={`flex items-center gap-2 text-sm transition ${
              viewType === "list"
                ? "text-blue-700 font-semibold"
                : "text-gray-500 hover:text-gray-700"
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
                  onClick={() =>
                    navigate(`/project/${p.projectName.toLowerCase()}`)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wide">
                      Project Name
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wide">
                      Client Name
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wide">
                      Manager Name
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wide">
                      Project Type
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockData.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 whitespace-nowrap text-gray-800 font-medium">
                        {p.projectName}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                        {p.clientName}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                        {p.managerName}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-600">
                        {p.projectType}
                      </td>
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
