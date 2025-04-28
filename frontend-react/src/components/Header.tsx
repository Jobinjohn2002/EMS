import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Excelencia Logo" className="h-8" />
        <span className="text-sm text-gray-500">People First IT Services Ecosystem</span>
      </div>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-200 flex justify-center items-center text-blue-700 font-bold">
          P
        </div>
      </div>
    </header>
  );
};

export default Header;
