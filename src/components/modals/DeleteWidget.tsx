import React from "react";

import { useDashboard } from "../../core/context/DashboardContext";

const DeleteWidget: React.FC = () => {
  const { state, dispatch } = useDashboard();
  const { isDeleteModalOpen, selectedWidget } = state;

  if (!isDeleteModalOpen || !selectedWidget) return null;

  const handleConfirmDelete = () => {
    dispatch({
      type: "DELETE_WIDGET",
      payload: { id: selectedWidget.id },
    });
    dispatch({ type: "CLOSE_DELETE_MODAL" });
  };

  return (
    <div className="fixed w-m inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md border border-gray-700">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-4">Widget Delete</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Are you sure you want to delete "{selectedWidget.title}"? This
            action can't be undone.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => dispatch({ type: "CLOSE_DELETE_MODAL" })}
            className="py-2 px-8 rounded-lg bg-gray-600 hover:bg-gray-700 text-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="py-2 px-8 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWidget;
