import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-gray-100 shadow-sm px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="./src/assets/excelencia.svg" alt="Excelencia Logo" className="h-8" />
      </div>

      <div className="mt-6">
        <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Requirement & Assumption
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Estimation
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Summary
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Billing Milestone
          </button>
          <div className="w-10 h-10 rounded-full bg-blue-200 flex justify-center items-center text-blue-700 font-bold">
          P
        </div>
        </div>
      </div>

    </header>
  );
};

const LandingHeader = () => {
  return (
    <header className="w-full bg-gray-100 shadow-sm px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="./src/assets/excelencia.svg" alt="Excelencia Logo" className="h-8" />
      </div>

      <div className="mt-6">
        <div className="flex space-x-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex justify-center items-center text-blue-700 font-bold">
          P
        </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
export {LandingHeader};
