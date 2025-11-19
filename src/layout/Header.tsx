import React from "react";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl text-cyan-400">Dashboard</h1>

      <div className="flex items-center space-x-2 sm:space-x-5">
        <button
          className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-extralight py-2 px-4 rounded-lg transition duration-300"
          title="Import Dashboard"
        >
          <ArrowDownTrayIcon className="size-5" />
          <span className="hidden sm:inline">Import</span>
        </button>
        <button
          className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-extralight py-2 px-4 rounded-lg transition duration-300"
          title="Export Dashboard"
        >
          <ArrowUpTrayIcon className="size-5" />
          <span className="hidden sm:inline">Export</span>
        </button>
        <button className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white font-extralight py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          <PlusIcon className="size-5" />
          <span className="hidden sm:inline">Widgets</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
