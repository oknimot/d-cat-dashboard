import React, { useEffect, useRef, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Widget } from "../../core/types/widget.types";
import { widgetsManifest } from "../widgets/config/widgets.manifest";
import { useDashboard } from "../../core/context/DashboardContext";

const WidgetWrapper: React.FC<{ widget: Widget }> = ({ widget }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [localTitle, setLocalTitle] = useState(widget.title);
  const { dispatch } = useDashboard();

  const inputRef = useRef<HTMLInputElement>(null);
  const WidgetComponent = widgetsManifest[widget.type]?.component;

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingTitle]);

  const saveTitle = () => {
    if (localTitle.trim() !== "" && localTitle !== widget.title) {
      dispatch({
        type: "UPDATE_WIDGET",
        payload: { ...widget, title: localTitle },
      });
    } else {
      setLocalTitle(widget.title);
    }
    setIsEditingTitle(false);
  };

  const titleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveTitle();
    }
  };

  return (
    <div className="rounded-lg shadow-lg flex flex-col h-full">
      <header className="bg-gray-700 px-1 flex items-center justify-between rounded-t-lg border-b border-gray-700">
        {isEditingTitle ? (
          <input
            ref={inputRef}
            type="text"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={titleKeyDown}
            className="flex-1 text-sm font-semibold bg-gray-700 text-yellow-400 px-2 py-1 rounded border-none focus:outline-none mx-2 min-w-0"
          />
        ) : (
          <h3
            onClick={() => setIsEditingTitle(true)}
            className="text-sm font-semibold text-yellow-400 truncate flex-1 mx-2 cursor-pointer hover:bg-gray-600/50 px-2 py-1 rounded transition-colors select-none border border-transparent"
            title="Click to edit title"
          >
            {widget.title}
          </h3>
        )}
        <div className="flex items-center space-x-2">
          <button
            className="text-gray-400 hover:text-yellow-400 transition-colors p-1 rounded-full"
            title="Edit widget"
          >
            <PencilSquareIcon className="size-4" />
          </button>
          <button
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full"
            title="Delete widget"
          >
            <TrashIcon className="size-4" />
          </button>
        </div>
      </header>
      <div className="p-4 flex-grow">
        <WidgetComponent widget={widget} />
      </div>
    </div>
  );
};

export default WidgetWrapper;
