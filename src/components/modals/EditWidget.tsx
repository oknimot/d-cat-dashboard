import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { widgetsManifest } from "../widgets/config/widgets.manifest";
import { useDashboard } from "../../core/context/DashboardContext";
import { Widget, WidgetConfig } from "../../core/types/widget.types";

const EditWidget: React.FC = () => {
  const { state, dispatch } = useDashboard();
  const { isEditModalOpen, selectedWidget } = state;
  const [config, setConfig] = useState<WidgetConfig>({} as WidgetConfig);

  useEffect(() => {
    if (selectedWidget) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConfig(selectedWidget.config);
    }
  }, [selectedWidget]);

  if (!isEditModalOpen || !selectedWidget) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWidget) {
      const updatedWidget = { ...selectedWidget, config };
      dispatch({ type: "UPDATE_WIDGET", payload: updatedWidget as Widget });
      dispatch({ type: "CLOSE_EDIT_MODAL" });
    }
  };

  const handleConfigChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    const isNumeric = ["rowCount", "colCount"].includes(name);
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: isNumeric ? parseInt(value, 10) || 0 : value,
    }));
  };

  const renderConfigFields = () => {
    const ConfigComponent =
      widgetsManifest[selectedWidget.type]?.configComponent;
    if (!ConfigComponent) {
      return null;
    }
    return (
      <ConfigComponent config={config} onConfigChange={handleConfigChange} />
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Edit Widget</h2>
          <button
            onClick={() => dispatch({ type: "CLOSE_EDIT_MODAL" })}
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {renderConfigFields()}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => dispatch({ type: "CLOSE_EDIT_MODAL" })}
              className="py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-gray-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWidget;
