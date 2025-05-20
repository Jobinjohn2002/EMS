import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import RequirementTable from "../components/requirement_assumption/RequirementTable";
import ClarificationTable from "../components/requirement_assumption/ClarificationTable";
// import AssumptionTable from "../components/assumption/AssumptionTable";
// import OutOfScopeTable from "../components/outofscope/OutOfScopeTable";

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
            <RequirementTable projectId={projectId!} />
          )}
          {/* {activeTab === "Clarification" && (
            <ClarificationTable projectId={projectId!} />
          )} */}
          {/* {activeTab === "Assumption" && (
            <AssumptionTable projectId={projectId!} />
          )}
          {activeTab === "Out of Scope" && (
            <OutOfScopeTable projectId={projectId!} />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ReqassumptionPage;
