import React, { useEffect, useState } from "react";
import { EditMilestoneModal, MilestoneModal } from "./MilestoneModal"; // Assuming MilestoneModal is correctly implemented
import requirementService from "../../services/requirementService";

interface SubRequirement {
  id: number;
  sub_requirement: string;
}

interface Requirement {
  id: number;
  requirement: string;
  sub_requirements: SubRequirement[];
}


const RequirementTable: React.FC<{ projectId: string }> = ({ }) => {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState<Requirement | null>(null);
  const [newSubRequirementText, setNewSubRequirementText] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const res = await requirementService.getAllWithSubRequirements();
      setRequirements(res);
    } catch (err) {
      console.error("Failed to fetch requirements:", err);
    }
  };

  const handleSave = async (requirementText: string) => {
    try {
      const estimationId = 1;
      const createdBy = 101;
      const newRequirement = await requirementService.create(
        {
          estimationId,
          requirement: requirementText,
          status: true,
          createdBy,
          createdAt: "",
        },
        [] // Provide an empty array for sub-requirements
      );

      setRequirements((prev) => [...prev, { ...newRequirement, sub_requirements: [] }]);
    } catch (error) {
      console.error("Error saving requirement:", error);
    } finally {
      setShowModal(false);
    }
  };

  const handleAddSub = async (requirementId: number, text: string) => {
    if (!text.trim()) return;
    const createdBy = 101;
    const newSubRequirement = await requirementService.createSubRequirement(requirementId, text, createdBy);
    setRequirements((prev) =>
      prev.map((req) =>
        req.id === requirementId
          ? { ...req, sub_requirements: [...req.sub_requirements, {id: newSubRequirement.id, sub_requirement: newSubRequirement.subrequirement}] }
          : req
      )
    );
    setNewSubRequirementText((prev) => ({ ...prev, [requirementId]: "" }));
  };

  const handleInputChange = (requirementId: number, value: string) => {
    setNewSubRequirementText((prev) => ({ ...prev, [requirementId]: value }));
  };

  const handleDeleteRequirement = (requirementId: number) => {
    setRequirements((prev) => prev.filter((req) => req.id !== requirementId));
  };

  const handleDeleteSubRequirement = (requirementId: number, subRequirementId: number) => {
    setRequirements((prev) =>
      prev.map((req) =>
        req.id === requirementId
          ? {
            ...req,
            sub_requirements: req.sub_requirements.filter((sub) => sub.id !== subRequirementId),
          }
          : req
      )
    );
  };

  const handleCancelAddSub = (requirementId: number) => {
    setNewSubRequirementText((prev) => ({ ...prev, [requirementId]: "" }));
  };
  const handleEditSave = async (id: number, updatedText: string) => {
    try {
      // await requirementService.update(id, { requirement: updatedText }); // assuming update method exists
      // setRequirements(reqs =>
      //   reqs.map(r => r.id === id ? { ...r, requirement: updatedText } : r)
      // );
    } catch (err) {
      console.error("Failed to update requirement:", err);
    } finally {
      setShowEditModal(false);
      setEditingRequirement(null);
    }
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

      {editingRequirement && (
        <EditMilestoneModal
          isOpen={showEditModal}
          title="Edit Requirement"
          placeholder="Enter requirement"
          defaultValue={editingRequirement.requirement}
          onClose={() => setShowEditModal(false)}
          onSave={(text) => handleEditSave(editingRequirement.id, text)}
        />
      )}



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
                      onClick={() => {
                        setEditingRequirement(req);
                        setShowEditModal(true);
                      }}
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
                                onClick={() => handleDeleteSubRequirement(req.id, sub.id)}
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