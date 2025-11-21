import React from "react";

import { TableWidgetProps } from "../../../core/types/widget.types";

const TableWidgetConfig: React.FC<{
  config: TableWidgetProps["config"];
  onConfigChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ config, onConfigChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="mb-4">
        <label
          htmlFor="rowCount"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Rows
        </label>
        <input
          type="number"
          id="rowCount"
          name="rowCount"
          min="0"
          max="20"
          value={config.rowCount || 0}
          onChange={onConfigChange}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="colCount"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Columns
        </label>
        <input
          type="number"
          id="colCount"
          name="colCount"
          min="0"
          max="10"
          value={config.colCount || 0}
          onChange={onConfigChange}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
          required
        />
      </div>
    </div>
  );
};

export default TableWidgetConfig;
