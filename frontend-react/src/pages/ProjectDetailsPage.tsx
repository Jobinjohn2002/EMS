import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import {
    Pencil,
    Trash2,
    Check,
    X,
    Plus,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

const tabs = ["Requirement", "Clarification", "Assumption", "Out of Scope"];

interface SubItem {
    id: number;
    text: string;
    isEditing: boolean;
    tempText?: string;
}

interface RequirementSection {
    id: number;
    title: string;
    isEditing: boolean;
    tempTitle?: string;
    subItems: SubItem[];
    isOpen: boolean;
    tab: string;
}

const ProjectDetailsPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [sections, setSections] = useState<RequirementSection[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newHeading, setNewHeading] = useState("");
    const [sectionCounter, setSectionCounter] = useState(1);

    const handleAddHeading = () => {
        if (!newHeading.trim()) return;
        const newSection: RequirementSection = {
            id: sectionCounter,
            title: newHeading.trim(),
            isEditing: false,
            subItems: [],
            isOpen: true,
            tab: activeTab,
        };
        setSections([...sections, newSection]);
        setSectionCounter(sectionCounter + 1);
        setNewHeading("");
        setShowModal(false);
    };

    const handleEditSection = (sectionId: number) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? { ...section, isEditing: true, tempTitle: section.title }
                    : section
            )
        );
    };

    const handleSaveSection = (sectionId: number) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? { ...section, isEditing: false, title: section.tempTitle || "", tempTitle: undefined }
                    : section
            )
        );
    };

    const handleCancelSection = (sectionId: number) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? { ...section, isEditing: false, tempTitle: undefined }
                    : section
            )
        );
    };

    const handleDeleteSection = (sectionId: number) => {
        setSections((prev) => prev.filter((section) => section.id !== sectionId));
    };

    const handleSectionTitleChange = (sectionId: number, value: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId ? { ...section, tempTitle: value } : section
            )
        );
    };

    const handleAddSubItem = (sectionId: number) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        subItems: [
                            ...section.subItems,
                            { id: Date.now(), text: "", isEditing: true },
                        ],
                    }
                    : section
            )
        );
    };

    const handleEdit = (sectionId: number, subId: number) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        subItems: section.subItems.map((s) =>
                            s.id === subId ? { ...s, isEditing: true, tempText: s.text } : s
                        ),
                    }
                    : section
            )
        );
    };

    const handleDelete = (sectionId: number, subId: number) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        subItems: section.subItems.filter((s) => s.id !== subId),
                    }
                    : section
            )
        );
    };

    const handleChange = (sectionId: number, subId: number, value: string) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        subItems: section.subItems.map((s) =>
                            s.id === subId ? { ...s, text: value } : s
                        ),
                    }
                    : section
            )
        );
    };

    const handleCancel = (sectionId: number, subId: number) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        subItems: section.subItems.map((s) =>
                            s.id === subId
                                ? { ...s, isEditing: false, text: s.tempText || "" }
                                : s
                        ),
                    }
                    : section
            )
        );
    };

    const handleSave = (sectionId: number, subId: number) => {
    setSections((prev) =>
    prev.map((section) =>
    section.id === sectionId
    ? {
         ...section,
         subItems: section.subItems.map((s) =>
         s.id === subId
         ? { ...s, isEditing: false, tempText: undefined }
         : s
        ),
      }
        : section
            )
        );
    };

    const toggleSection = (sectionId: number) => {
        setSections((prev) =>
        prev.map((section) =>
        section.id === sectionId
        ? { ...section, isOpen: !section.isOpen }
        : section
            )
        );
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <Header />
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {projectId} - Project Overview
                    </h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
                    >
                        Create Milestone
                    </button>
                </div>

          <div className="flex border-b mb-6">
                    {tabs.map((tab) => (
                        <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                         className={`px-4 py-2 text-sm font-medium border-b-2 transition ${activeTab === tab
                        ? "border-blue-600 text-blue-600"
                         : "border-transparent text-gray-500 hover:text-blue-600"
                        }`}
                        >
                        {tab}
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    {sections
                    .filter((section) => section.tab === activeTab)
                    .map((section) => (
                         <div
                            key={section.id}
                            className="border rounded-xl bg-white p-4 shadow"
                            >
                            <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                            {section.isEditing ? (
                             <input
                             type="text"
                             value={section.tempTitle}
                             onChange={(e) =>
                             handleSectionTitleChange(section.id, e.target.value)
                             }
                             className="border rounded px-2 py-1 text-sm"
                            autoFocus
                             />
                             ) : (
                            <h2 className="text-lg font-semibold text-gray-800">
                             {section.title}
                            </h2>
                             )}
                            <button
                             onClick={() => toggleSection(section.id)}
                             className="text-gray-500 hover:text-gray-700"
                             >
                             {section.isOpen ? (
                              <ChevronUp size={18} />
                              ) : (
                              <ChevronDown size={18} />
                              )}
                              </button>
                              </div>
                              <div className="flex gap-2">
                              {section.isEditing ? (
                               <>
                               <button
                                onClick={() => handleSaveSection(section.id)}
                                className="text-green-600 hover:text-green-800"
                                >
                                <Check size={16} />
                                 </button>
                                 <button
                                 onClick={() => handleCancelSection(section.id)}
                                 className="text-red-500 hover:text-red-700"
                                 >
                                <X size={16} />
                                 </button>
                                 </>
                                 ) : (
                                 <>
                                <button
                                 onClick={() => handleEditSection(section.id)}
                                 className="text-blue-500 hover:text-blue-700"
                                 >
                                 <Pencil size={16} />
                                 </button>
                                 <button
                                 onClick={() => handleDeleteSection(section.id)}
                                 className="text-red-500 hover:text-red-700"
                                 >
                                 <Trash2 size={16} />
                                 </button>
                                  </>
                                  )}
                                 <button
                                 onClick={() => handleAddSubItem(section.id)}
                                 className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                                 >
                                <Plus size={16} />
                                 Add Subtopic
                                </button>
                                </div>
                                </div>

                                {section.isOpen && (
                                    <table className="min-w-full table-auto text-sm text-left border rounded overflow-hidden">
                                        <thead className="bg-gray-100 text-gray-700 font-medium">
                                            <tr>
                                                <th className="px-4 py-2 text-center w-28">Actions</th>
                                                <th className="px-4 py-2">{activeTab}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {section.subItems.map((item) => (
                                                <tr key={item.id} className="border-t">
                                                    <td className="px-4 py-2 text-center">
                                                        <div className="flex justify-center gap-2">
                                                            {item.isEditing ? (
                                                                <>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleSave(section.id, item.id)
                                                                        }
                                                                        className="text-green-600 hover:text-green-800"
                                                                    >
                                                                        <Check size={16} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleCancel(section.id, item.id)
                                                                        }
                                                                        className="text-red-500 hover:text-red-700"
                                                                    >
                                                                        <X size={16} />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleEdit(section.id, item.id)
                                                                        }
                                                                        className="text-blue-500 hover:text-blue-700"
                                                                    >
                                                                        <Pencil size={16} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDelete(section.id, item.id)
                                                                        }
                                                                        className="text-red-500 hover:text-red-700"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {item.isEditing ? (
                                                            <input
                                                                type="text"
                                                                className="w-full border rounded px-2 py-1"
                                                                value={item.text}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        section.id,
                                                                        item.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                autoFocus
                                                            />
                                                        ) : (
                                                            item.text || (
                                                                <span className="text-gray-400">
                                                                    No content
                                                                </span>
                                                            )
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        ))}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
                            <h2 className="text-lg font-semibold mb-4">
                                Create {activeTab} Heading
                            </h2>
                            <input
                                type="text"
                                value={newHeading}
                                onChange={(e) => setNewHeading(e.target.value)}
                                className="w-full border px-3 py-2 rounded mb-4"
                                placeholder="e.g., Mobile number & email authentication"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddHeading}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetailsPage;
