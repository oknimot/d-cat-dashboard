import React, { useEffect, useRef, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";

import { Widget } from "../../core/types/widget.types";
import { widgetsManifest } from "../widgets/config/widgets.manifest";
import { useDashboard } from "../../core/context/DashboardContext";

const WidgetWrapper: React.FC<{
  widget: Widget;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
}> = ({ widget, dragHandleProps }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [localTitle, setLocalTitle] = useState(widget.title);
  const { dispatch } = useDashboard();

  const inputRef = useRef<HTMLInputElement>(null);
  const WidgetComponent = widgetsManifest[widget.type]?.component;
  const configComponent = widgetsManifest[widget.type]?.configComponent;

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

  const handleDelete = () => {
    dispatch({ type: "OPEN_DELETE_MODAL", payload: widget });
  };

  const handleEdit = () => {
    dispatch({ type: "OPEN_EDIT_MODAL", payload: widget });
  };

  return (
    <div className="rounded-lg shadow-lg flex flex-col h-full">
      <header className="bg-gray-700 px-1 flex items-center justify-between rounded-t-lg group">
        <div {...dragHandleProps} className="cursor-grab text-gray-400 pl-2">
          <WindowIcon className="size-4" />
        </div>
        {isEditingTitle ? (
          <input
            ref={inputRef}
            type="text"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={titleKeyDown}
            className="flex-1 text-sm font-semibold bg-gray-700 text-yellow-400 px-2 py-1 rounded border-none focus:outline-none min-w-0"
          />
        ) : (
          <h3
            onClick={() => setIsEditingTitle(true)}
            className="text-sm font-semibold text-yellow-400 truncate flex-1 cursor-pointer px-2 py-1 rounded transition-colors select-none border border-transparent"
            title="Click to edit title"
          >
            {widget.title}
          </h3>
        )}
        <div className="flex items-center space-x-2">
          {configComponent && (
            <button
              onClick={handleEdit}
              className="text-gray-400 hover:text-yellow-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Edit widget"
            >
              <PencilSquareIcon className="size-4" />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Delete widget"
          >
            <TrashIcon className="size-4" />
          </button>
        </div>
      </header>
      <div className="p-3 flex-grow rounded-b-lg bg-white">
        <WidgetComponent widget={widget} />
      </div>
    </div>
  );
};

export default React.memo(WidgetWrapper);
