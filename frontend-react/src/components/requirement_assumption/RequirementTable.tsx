import React, { useEffect, useState } from "react";
import axios from "axios";
import { MilestoneModal } from "./MilestoneModal"; // Assuming MilestoneModal is correctly implemented

interface SubRequirement {
  id: number;
  sub_requirement: string;
}

interface Requirement {
  id: number;
  requirement: string;
  sub_requirements: SubRequirement[];
}

const RequirementTable: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newSubRequirementText, setNewSubRequirementText] = useState<{ [key: number]: string }>({});
  // Optional: state to track which requirement/sub-requirement is being edited
  // const [editingRequirementId, setEditingRequirementId] = useState<number | null>(null);
  // const [editingSubRequirementId, setEditingSubRequirementId] = useState<number | null>(null);


  useEffect(() => {
    // Keep static data for now as fetching is commented out
    const testData: Requirement[] = [
      {
        id: 1,
        requirement: "User Login System - Longer requirement for wrapping and testing",
        sub_requirements: [
          { id: 101, sub_requirement: "Login via email/password" },
          { id: 102, sub_requirement: "Forgot password functionality" },
        ],
      },
      {
        id: 2,
        requirement: "Dashboard Features Overview",
        sub_requirements: [
          { id: 201, sub_requirement: "Show user stats" },
          { id: 202, sub_requirement: "Display recent activities" },
        ],
      },
      {
        id: 3,
        requirement: "Group Categories and Subcategories Management System",
        sub_requirements: [
          { id: 301, sub_requirement: "Allow users to select multiple categories" },
          { id: 302, sub_requirement: "Implement real-time filtering of subcategories based on selection" },
          { id: 303, sub_requirement: "Provide CRUD endpoints for admins to manage categories/subcategories" },
        ],
      },
       {
        id: 4,
        requirement: "QR scanners for event tickets Implementation Details",
        sub_requirements: [
          { id: 401, sub_requirement: "Generate unique QR codes for each ticket, encoded with ticket_id and user details." },
          { id: 402, sub_requirement: "Allow users to download their ticket (PDF/Image) with the QR code after purchase." },
        ],
      },
    ];
    setRequirements(testData);
  }, []);

  // The fetchRequirements and axios calls are kept but commented out
  // Uncomment and implement if you need to connect to an API

  // const fetchRequirements = async () => {
  //   try {
  //     const res = await axios.get(`/api/requirement/${projectId}`);
  //     setRequirements(res.data);
  //   } catch (err) {
  //     console.error("Failed to fetch requirements:", err);
  //   }
  // };

  // const handleSave = async (requirement: string) => {
  //   try { /* ... axios.post call ... */
  //      setShowModal(false);
  //     // fetchRequirements();
  //   } catch (err) { console.error("Failed to add requirement:", err); }
  // };

   // This function is triggered by Enter key or Save icon click on the inline input
  // const handleAddSub = async (requirementId: number, text: string) => {
  //   if (!text.trim()) return;
  //   try { /* ... axios.post call ... */
  //     // fetchRequirements();
  //     setNewSubRequirementText((prev) => ({ ...prev, [requirementId]: "" })); // Clear input after successful save
  //   } catch (err) { console.error("Failed to add sub-requirement:", err); }
  // };


  // --- Placeholder/Static Data Logic (Replace with API calls when ready) ---
  const handleSave = async (requirement: string) => {
    console.log("Saving requirement (static data):", requirement);
    // Use Math.random() for unique id with static data
    const newReq = {
      id: Math.random(),
      requirement: requirement,
      sub_requirements: [],
    };
    setRequirements([...requirements, newReq]);
    setShowModal(false);
  };

   // This function is triggered by Enter key or Save icon click on the inline input
  const handleAddSub = async (requirementId: number, text: string) => {
    if (!text.trim()) return;
    console.log(`Adding sub-requirement (static data) "${text}" to requirement ${requirementId}`);

     // Use Math.random() for unique id with static data
    const newSub = { id: Math.random(), sub_requirement: text };

    setRequirements(
      requirements.map((req) =>
        req.id === requirementId
          ? {
              ...req,
              sub_requirements: [
                ...req.sub_requirements,
                newSub
              ],
            }
          : req
      )
    );
    // Clear the input field after adding
    setNewSubRequirementText((prev) => ({ ...prev, [requirementId]: "" }));
  };

  const handleInputChange = (requirementId: number, value: string) => {
    setNewSubRequirementText((prev) => ({ ...prev, [requirementId]: value }));
  };

  const handleDeleteRequirement = (requirementId: number) => {
    console.log("Delete requirement (static data):", requirementId);
     // For static data: Remove the requirement
    setRequirements(requirements.filter((req) => req.id !== requirementId));
  };

  const handleDeleteSubRequirement = (requirementId: number, subRequirementId: number) => {
    console.log(`Delete sub-requirement (static data) ${subRequirementId} from requirement ${requirementId}`);
     // For static data: Remove the sub-requirement
    setRequirements(
      requirements.map((req) =>
        req.id === requirementId
          ? {
              ...req,
              sub_requirements: req.sub_requirements.filter((sub) => sub.id !== subRequirementId),
            }
          : req
      )
    );
  };

    // Placeholder Edit Handlers (functionality needs implementation)
    const handleEditRequirement = (requirementId: number) => {
        console.log("Edit requirement clicked:", requirementId);
        // Implement your edit logic here - e.g., show an input to edit the requirement text
        alert(`Implement Edit functionality for Requirement ID: ${requirementId}`);
    };

     const handleEditSubRequirement = (requirementId: number, subRequirementId: number) => {
        console.log(`Edit sub-requirement clicked: ${subRequirementId} in requirement ${requirementId}`);
         // Implement your edit logic here - e.g., show an editable input for this sub-requirement
         alert(`Implement Edit functionality for Sub-Requirement ID: ${subRequirementId}`);
    };

    // Handler for the Cancel (X) button on the inline input
    const handleCancelAddSub = (requirementId: number) => {
        setNewSubRequirementText(prev => ({ ...prev, [requirementId]: '' })); // Clear the input
    };

  // --- End Placeholder/Static Data Logic ---


  return (
    <div className="p-4"> {/* Added some padding */}
      {/* Add Requirement Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        + Create Milestone {/* Changed text based on image */}
      </button>

      {/* Modal (Assuming MilestoneModal handles its own visibility based on isOpen prop) */}
      {/* Make sure MilestoneModal correctly handles the onSave prop */}
      <MilestoneModal
        isOpen={showModal}
        title="Add Requirement" // Title can be adjusted if needed
        placeholder="Enter requirement"
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden"> {/* Wrapper for rounded corners */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12"> {/* Narrower Action column */}
                Action
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Requirements
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requirements.map((req) => (
              <React.Fragment key={req.id}>
                {/* Main Requirement Row */}
                <tr className="hover:bg-gray-100"> {/* Hover effect */}
                  <td className="px-4 py-3 flex items-center space-x-2"> {/* Centered icons */}
                    {/* Expand/Collapse Button */}
                     <button
                       onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
                       className="text-gray-500 hover:text-gray-700 focus:outline-none text-lg" // Icon styling
                        title={expandedId === req.id ? "Collapse" : "Expand"}
                     >
                       {expandedId === req.id ? (
                         // Minus icon for collapsed
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                         </svg>
                       ) : (
                         // Plus icon for expanded
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                         </svg>
                       )}
                     </button>
                     {/* EDIT ICON - Added */}
                    <button
                        onClick={() => handleEditRequirement(req.id)}
                        className="text-blue-500 hover:text-blue-700 focus:outline-none text-lg"
                        title="Edit Requirement"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    {/* DELETE ICON - Ensured correct placement */}
                     <button
                       onClick={() => handleDeleteRequirement(req.id)}
                       className="text-red-500 hover:text-red-700 focus:outline-none text-lg"
                       title="Delete Requirement"
                     >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                       </svg>
                     </button>
                   </td>
                  {/* Added break-words to help prevent overflow collapsing column */}
                  <td className="px-4 py-3 font-medium text-gray-900 break-words">{req.requirement}</td>
                </tr>

                {/* Sub-Requirement Rows */}
                {expandedId === req.id && (
                  <>
                    {req.sub_requirements.map((sub) => (
                      <tr key={sub.id} className="bg-gray-50 hover:bg-gray-100"> {/* Light background for sub-rows */}
                        <td className="px-4 py-3 flex items-center space-x-2 w-12 pl-8"> {/* Indentation and icons */}
                            {/* Bullet or arrow icon for sub-item visualization */}
                            {/* Using a simple dot for now, you could use an arrow like the previous version if preferred */}
                            <span className="text-gray-500 text-xs">•</span>
                            {/* EDIT ICON - Added for sub-requirements */}
                             <button
                                onClick={() => handleEditSubRequirement(req.id, sub.id)}
                                className="text-blue-500 hover:text-blue-700 focus:outline-none text-lg"
                                title="Edit Sub-Requirement"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                            {/* DELETE ICON - Ensured correct placement */}
                             <button
                               onClick={() => handleDeleteSubRequirement(req.id, sub.id)}
                               className="text-red-500 hover:text-red-700 focus:outline-none text-lg"
                               title="Delete Sub-Requirement"
                             >
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                               </svg>
                             </button>
                        </td>
                        {/* Added break-words */}
                        <td className="px-4 py-3 text-sm text-gray-600 break-words">{sub.sub_requirement}</td>
                      </tr>
                    ))}

                    {/* Inline Sub-Requirement Add Input Row */}
                    <tr className="bg-gray-50 hover:bg-gray-100">
                       <td className="px-4 py-3 w-12 pl-8"> {/* Indentation */}
                          {/* Optional: Add a '+' icon or similar here if desired */}
                       </td>
                       <td className="px-4 py-3 flex items-center space-x-2"> {/* Use flex to align input and buttons */}
                         <input
                           type="text"
                           className="border border-gray-300 px-3 py-1 rounded-md w-full text-sm text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                           placeholder="Enter sub-requirement and press Enter"
                           value={newSubRequirementText[req.id] || ''}
                           onChange={(e) => handleInputChange(req.id, e.target.value)}
                            // Trigger add on Enter key
                           onKeyDown={(e) => {
                             if (e.key === "Enter") {
                               const value = (e.target as HTMLInputElement).value;
                               handleAddSub(req.id, value);
                             }
                           }}
                         />
                         {/* SAVE (TICK) ICON - Added */}
                        <button
                            onClick={() => handleAddSub(req.id, newSubRequirementText[req.id] || '')}
                            className="text-green-500 hover:text-green-700 focus:outline-none text-lg"
                            title="Save Sub-Requirement"
                            disabled={!newSubRequirementText[req.id]?.trim()} // Disable if input is empty
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {/* CANCEL (X) ICON - Added and wired up */}
                         <button
                            onClick={() => handleCancelAddSub(req.id)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none text-lg"
                            title="Cancel"
                         >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                             </svg>
                        </button>
                       </td>
                    </tr>
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequirementTable;