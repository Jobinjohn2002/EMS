import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const tabs = [
  "Requirement",
  "Clarification",
  "Assumption",
  "Out of Scope",
];

const ProjectDetailsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Header />
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          {projectId} - Project Overview
        </h1>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-blue-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "Requirement" && (
            <div>
              
            </div>
          )}
          {activeTab === "Clarification" && (
            <div>
              {/* Add content for Estimation */}
            </div>
          )}
          {activeTab === "Assumption" && (
            <div>
              {/* Add content for Summary */}
            </div>
          )}
          {activeTab === "Out of Scope" && (
            <div>
              {/* Add content for Billing Milestones */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;



