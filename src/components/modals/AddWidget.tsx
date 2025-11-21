import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { widgetsManifest } from "../widgets/config/widgets.manifest";
import { useDashboard } from "../../core/context/DashboardContext";
import type { WidgetType } from "../../core/types/widget.types";

/**
 * The `AddWidget` component. Provides a modal allowing the user to add a new widget to the dashboard.
 * @returns The JSX element representing the add widget modal.
 */
const AddWidget: React.FC = () => {
  const { state, dispatch } = useDashboard();

  // Nothing to render if the state flag indicates that the modal is not open
  if (!state.isAddModalOpen) return null;

  /**
   * Converts the widgetsManifest object into an array of option objects.
   * Each option object contains the type, label, and description of each widget.
   */
  const options = Object.entries(widgetsManifest).map(([type, details]) => ({
    type: type as WidgetType,
    label: details.label,
    description: details.description,
  }));

  /**
   * Handles the selection of a widget type and closes the add widget modal.
   * @param {WidgetType} type - The type of widget to add.
   *
   * @private
   */
  const handleSelection = (type: WidgetType) => {
    dispatch({ type: "ADD_WIDGET", payload: type });
    dispatch({ type: "CLOSE_ADD_MODAL" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Add a New Widget</h2>
          <button
            onClick={() => dispatch({ type: "CLOSE_ADD_MODAL" })}
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>
        <div className="space-y-4">
          {options.map((option) => (
            <button
              key={option.type}
              onClick={() => handleSelection(option.type)}
              className="w-full text-left p-4 bg-gray-700 hover:bg-gray-900/50 rounded-lg transition-all duration-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <h3 className="font-semibold text-yellow-400">{option.label}</h3>
              <p className="text-gray-300 text-xs font-thin">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddWidget;
