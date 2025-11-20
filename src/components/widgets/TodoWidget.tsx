import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

import type { TodoItem, TodoWidgetProps } from "../../core/types/widget.types";
import { useDashboard } from "../../core/context/DashboardContext";

const TodoWidget: React.FC<{ widget: TodoWidgetProps }> = ({ widget }) => {
  const { dispatch } = useDashboard();
  const [newItemText, setNewItemText] = useState("");

  const onAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim() === "") return;

    const task: TodoItem = {
      id: uuidv4(),
      text: newItemText.trim(),
      completed: false,
    };

    const todoWidget = {
      ...widget,
      config: {
        ...widget.config,
        items: checkedOnBottom([...widget.config.items, task]),
      },
    };

    dispatch({ type: "UPDATE_WIDGET", payload: todoWidget });
    setNewItemText("");
  };

  const handleTaskAction = (itemId: string, action: "toggle" | "delete") => {
    let todoItems = widget.config.items;
    switch (action) {
      case "toggle": {
        todoItems = checkedOnBottom(
          widget.config.items.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        );
        break;
      }
      case "delete": {
        todoItems = widget.config.items.filter((item) => item.id !== itemId);
        break;
      }
    }
    const todoWidget = {
      ...widget,
      config: { ...widget.config, items: todoItems },
    };
    dispatch({ type: "UPDATE_WIDGET", payload: todoWidget });
  };

  const checkedOnBottom = (todos: TodoItem[]): TodoItem[] => {
    return todos.sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
  };

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={onAddTask} className="flex mb-3">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow bg-white border border-gray-600 border-r-0 text-gray-700 text-sm rounded-l-md p-2"
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-700 px-4 rounded-r-md transition border border-gray-600"
        >
          Add
        </button>
      </form>

      {widget.config.items.length === 0 && (
        <div className="text-gray-400 text-sm text-center mt-4">
          No tasks yet.
        </div>
      )}

      <ul className="space-y-2 overflow-y-auto flex-grow">
        {widget.config.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between bg-gray-200/50 p-2 rounded-md group"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleTaskAction(item.id, "toggle")}
                className="size-4 focus:ring-yellow-400 focus:ring-2 mr-3"
              />
              <span
                className={`text-sm ${
                  item.completed
                    ? "line-through text-gray-400"
                    : "text-gray-500"
                }`}
              >
                {item.text}
              </span>
            </div>
            <button
              onClick={() => handleTaskAction(item.id, "delete")}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity ml-3"
            >
              <TrashIcon className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoWidget;
