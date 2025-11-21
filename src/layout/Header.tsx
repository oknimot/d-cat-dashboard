import React, { useRef } from "react";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  PlusIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

import { useDashboard } from "../core/context/DashboardContext";
import { DashboardState } from "../core/types/dashboard.types";
import { useAuth } from "../core/context/AuthContext";

const Header: React.FC = () => {
  const { state, dispatch } = useDashboard();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, logout } = useAuth();

  const handleExport = () => {
    if (state.widgets.length === 0) {
      alert(
        "Sorry, but it's not possible to export an empty dashboard. Create a widget first and try again."
      );
      return;
    }
    try {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(state, null, 2)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = `d-cat-dashboard-export-${new Date().toISOString()}.json`;
      link.click();
    } catch (error) {
      console.error("Failed to export dashboard state", error);
      alert("Error: Could not export dashboard.");
    }
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json") {
      alert("Invalid file type. Please select a JSON file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== "string") {
          throw new Error("Failed to read file content.");
        }
        const importedState = JSON.parse(text) as DashboardState;

        if (
          importedState === null ||
          typeof importedState !== "object" ||
          !Array.isArray(importedState.widgets)
        ) {
          throw new Error("Invalid JSON structure for dashboard state.");
        }

        if (
          window.confirm(
            "Are you sure you want to import this dashboard? This will overwrite your current layout."
          )
        ) {
          dispatch({ type: "LOAD_STATE", payload: importedState });
        }
      } catch (error) {
        console.error("Failed to import dashboard state", error);
        alert(
          "Error: Could not import dashboard. The file might be corrupted or in the wrong format."
        );
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };
    reader.onerror = () => {
      alert("Error reading the file.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl text-yellow-400 tracking-wide">Dashboard</h1>

      {user && (
        <React.Fragment>
          <div className="flex items-center space-x-2 sm:space-x-5">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={handleImport}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-300"
                title="Import Dashboard"
              >
                <ArrowDownTrayIcon className="size-5" />
                <span className="hidden sm:inline">Import</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={onFileChange}
                accept=".json"
                className="hidden"
              />
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition duration-300"
                title="Export Dashboard"
              >
                <ArrowUpTrayIcon className="size-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={() => dispatch({ type: "OPEN_ADD_MODAL" })}
                className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-gray-700 py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                <PlusIcon className="size-5" />
                <span className="hidden sm:inline">Widget</span>
              </button>
            </div>
            <div className="h-8 w-px bg-gray-600 hidden sm:block"></div>

            <div className="flex items-center space-x-3">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-9 h-9 rounded-full border-2 border-yellow-500"
              />
              <span className="hidden lg:inline text-gray-300 font-medium">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <PowerIcon className="size-5" />
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
    </header>
  );
};

export default Header;
