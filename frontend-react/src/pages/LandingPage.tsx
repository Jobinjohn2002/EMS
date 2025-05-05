import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EstimationCard from "../components/estimation/EstimationCard";
import { estimationService } from "../services/estimationService";
import { EstimationModel } from "../models/EstimationModel"; 
import simLogo from "../assets/sim.png";
import hilLogo from "../assets/hil.png";
import csLogo from "../assets/cs.png";
import sanLogo from "../assets/san.png";
import kbLogo from "../assets/kb.png";
import "primeicons/primeicons.css";
import Header, { LandingHeader } from "../components/Header";
import { projectService } from "../services/projectService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define Omit type manually if not using type-fest (or import from type-fest)
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Import your frontend Estimation model
import { Estimation as FrontendEstimation } from '../models/Estimation';
import EstimationTable from "../components/estimation/EstimationTable";

// Define the type for the data payload expected by the backend create endpoint
// This is based on your frontend model, omitting backend-managed fields
type CreateEstimationPayload = Omit<FrontendEstimation, 'id' | 'createdAt' | 'modifiedAt' | 'modifiedBy'>;


// Define types for dropdown options for clarity
interface ProjectOption {
  id: number;
  name: string;
}

interface StatusOption {
  id: number;
  label: string;
}

interface UserOption {
  id: number;
  label: string; // Or maybe 'name', depends on your data structure
}


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

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [versionNo, setVersionNo] = useState<string>('');
  const [approvedBy, setApprovedBy] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  // Note: 'preparedBy' is NOT nullable in your frontend model either.
  // We'll use null for state initially, but validate before saving.
  const [selectedPreparedBy, setSelectedPreparedBy] = useState<number | null>(null);
  const [description, setDescription] = useState<string>('');

  const [dropdownProjects, setDropdownProjects] = useState<ProjectOption[]>([]);
  const statusOptions: StatusOption[] = [
    { id: 1, label: "Pending" },
    { id: 2, label: "Approved" },
  ];
  const preparedByOptions: UserOption[] = [
    { id: 1, label: "Vijay" },
    { id: 2, label: "Jagadish" },
    { id: 3, label: "Jobin" },
  ];

  const refreshProjects = async () => {
    setLoading(true);
    try {
      console.log("refreshProjects called, but currently using mockData for display.");
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handles saving the form data using the frontend model types
  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validation based on the frontend model: preparedBy is required (number)
    if (selectedPreparedBy === null) {
      alert('Prepared by is required.');
      return;
    }

    // Prepare the data payload matching the frontend CreateEstimationPayload type
    const estimationData: CreateEstimationPayload = {
      projectId: selectedProject ?? undefined, 
      versionNo: versionNo || undefined, 
      date: selectedDate ? selectedDate.toISOString().split('T')[0] : undefined, 
      approvedBy: approvedBy || undefined, 
      status: selectedStatus ?? undefined, 
      preparedBy: selectedPreparedBy, 
      description: description || undefined, 
      // id, createdAt, modifiedAt, modifiedBy are omitted as per CreateEstimationPayload type
    };

    console.log('Attempting to save estimation:', estimationData);

    try {
      const savedEstimation = await estimationService.createEstimation(estimationData);

      console.log('Estimation saved successfully:', savedEstimation);

      // Reset form state to initial values
      setSelectedProject(null);
      setVersionNo('');
      setSelectedDate(null);
      setApprovedBy('');
      setSelectedStatus(null);
      setSelectedPreparedBy(null);
      setDescription('');

      togglePopup();

      alert('Estimation saved successfully!');
      navigate("/version-history");


    } catch (error) {
      console.error('Error saving estimation:', error);
      // --- Handle error ---
      // Show an error message to the user
      alert(`Failed to save estimation. Please try again.\nError: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  const fetchProjects = async () => {
    try {
      const data = await projectService.getProjectEstimations();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch project estimations", error);
    }
  };

  const handleEdit = (projectId: number) => {
    navigate(`/create-estimation/${projectId}`);
  };

  useEffect(() => {
    fetchProjects();
    projectService
      .getAll()
      .then((data) => {
        const mappedProjects = data
          .filter((project) => project.id !== undefined)
          .map((project) => ({
            id: project.id as number,
            name: project.projectName,
          }));
        setDropdownProjects(mappedProjects);
      })
      .catch((error) => {
        console.error("Failed to load dropdown projects", error);
        setDropdownProjects([]);
      });
  }, []);


  const togglePopup = (): void => {
    setIsOpen(!isOpen);

    if (isOpen) {
        setSelectedProject(null);
        setVersionNo('');
        setSelectedDate(null);
        setApprovedBy('');
        setSelectedStatus(null);
        setSelectedPreparedBy(null);
        setDescription('');
    }
    if (!isOpen && dropdownProjects.length === 0) {
       projectService
         .getAll()
         .then((data) => {
           const mappedProjects = data
             .filter((project) => project.id !== undefined)
             .map((project) => ({
               id: project.id as number,
               name: project.projectName,
             }));
           setDropdownProjects(mappedProjects);
         })
         .catch((error) => {
           console.error("Failed to load dropdown projects", error);
           setDropdownProjects([]);
         });
     }
  };


  const handleDelete = (id: number) => {
    console.log("Deleting project with id", id);
  };

  return (
    <div className="min-h-screen bg-white-100">
      <LandingHeader />
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
              className="bg-white rounded-xl p-6 shadow-lg relative w-96 max-h-[90vh] overflow-y-auto"
              style={{ width: "60%" }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Version
              </h2>

              <form onSubmit={handleSave}>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label htmlFor="projectSelect" className="block text-sm font-medium text-gray-700">
                      Projects
                    </label>
                    <select
                      id="projectSelect"
                      value={selectedProject ?? ''}
                      onChange={(e) => setSelectedProject(e.target.value ? parseInt(e.target.value, 10) : null)}
                      className="text-sm py-1 mt-1 block w-full h-8 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Select Projects</option>
                      {dropdownProjects.length > 0 ? (
                        dropdownProjects.map((proj) => (
                          <option key={proj.id} value={proj.id}>
                            {proj.name}
                          </option>
                        ))
                      ) : (
                         <option value="" disabled>Loading projects...</option>
                      )}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="versionInput" className="block text-sm font-medium text-gray-700">
                      Version No
                    </label>
                    <input
                      id="versionInput"
                      type="text"
                      value={versionNo}
                      onChange={(e) => setVersionNo(e.target.value)}
                      className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="datePickerInput" className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <DatePicker
                      id="datePickerInput"
                      selected={selectedDate}
                      onChange={(date: Date | null) => setSelectedDate(date)}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="MM/DD/YYYY"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      calendarClassName="tailwind-datepicker"
                    />
                  </div>

                  <div>
                    <label htmlFor="approvedByInput" className="block text-sm font-medium text-gray-700">
                      Approved by
                    </label>
                    <input
                      id="approvedByInput"
                      type="text"
                      value={approvedBy}
                      onChange={(e) => setApprovedBy(e.target.value)}
                      className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="statusSelect" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="statusSelect"
                      value={selectedStatus ?? ''}
                      onChange={(e) => setSelectedStatus(e.target.value ? parseInt(e.target.value, 10) : null)}
                      className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Select</option>
                      {statusOptions.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preparedBySelect" className="block text-sm font-medium text-gray-700">
                      Prepared by
                    </label>
                    <select
                      id="preparedBySelect"
                      value={selectedPreparedBy ?? ''}
                      onChange={(e) => setSelectedPreparedBy(e.target.value ? parseInt(e.target.value, 10) : null)}
                      className="text-sm py-1 mt-1 h-8 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select</option>
                      {preparedByOptions.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="descriptionTextarea" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="descriptionTextarea"
                    placeholder="Write a Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="resize-none text-sm py-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-24"
                  ></textarea>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={togglePopup}
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
            <EstimationTable
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;