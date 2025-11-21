import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult,
} from "@hello-pangea/dnd";

import { useDashboard } from "../core/context/DashboardContext";
import WidgetWrapper from "../components/wrappers/WidgetWrapper";

const Dashboard: React.FC = () => {
  const { state, dispatch } = useDashboard();

  if (state.widgets.length === 0) {
    return (
      <div className="text-center py-32">
        <h2 className="text-xl font-bold text-gray-400">
          Your dashboard is empty.
        </h2>
        <p className="text-gray-500 mt-2 text-xs">
          Click "+ Widget" to get started.
        </p>
      </div>
    );
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    dispatch({ type: "REORDER_WIDGETS", payload: result });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="dashboard" direction="horizontal">
        {(provided: DroppableProvided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-wrap"
          >
            {state.widgets.map((widget, index) => (
              <Draggable key={widget.id} draggableId={widget.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={provided.draggableProps.style}
                    className="p-3 sm:w-1/2 md:w-1/3 lg:w-1/4"
                  >
                    <WidgetWrapper
                      key={widget.id}
                      widget={widget}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Dashboard;
