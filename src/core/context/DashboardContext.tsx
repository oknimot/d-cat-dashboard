import React, { createContext, useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import type { DashboardAction, DashboardState } from "../types/dashboard.types";
import { Widget, WidgetType } from "../types/widget.types";
import { widgetsManifest } from "../../components/widgets/config/widgets.manifest";

// TODO: Find a better key construction (in case of addding authentication/multiple users)
const LOCAL_STORAGE_KEY = "dashboardState";

const initState: DashboardState = {
  widgets: [],
  isAddModalOpen: false,
};

const DashboardContext = createContext({
  state: initState,
  dispatch: (() => null) as React.Dispatch<DashboardAction>,
});

// TODO: Find a better way to export DashboardContext utility functions... (will be more utils later I think)
// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => useContext(DashboardContext);

const createNewWidget = (type: WidgetType): Widget => {
  const manifestEntry = widgetsManifest[type];

  if (!manifestEntry) {
    throw new Error(`Unknown widget type: ${type}`);
  }

  return {
    id: uuidv4(),
    type: type,
    title: manifestEntry.title,
    config: JSON.parse(JSON.stringify(manifestEntry.init)), // Better to do this "deep copy" to prevent mutation
  };
};

const dashboardReducer = (
  state: DashboardState,
  action: DashboardAction
): DashboardState => {
  switch (action.type) {
    case "LOAD_STATE":
      return {
        ...initState,
        ...action.payload,
        isAddModalOpen: false,
      };
    case "OPEN_ADD_MODAL":
      return { ...state, isAddModalOpen: true };
    case "CLOSE_ADD_MODAL":
      return { ...state, isAddModalOpen: false };
    case "ADD_WIDGET": {
      const newWidget = createNewWidget(action.payload);
      return { ...state, widgets: [...state.widgets, newWidget] };
    }
    case "UPDATE_WIDGET":
      return {
        ...state,
        widgets: state.widgets.map((widget) =>
          widget.id === action.payload.id ? action.payload : widget
        ),
      };
    case "REORDER_WIDGETS": {
      const { source, destination } = action.payload;
      if (!destination) return state;
      const orderedWidgets = Array.from(state.widgets);
      const [reorderedItem] = orderedWidgets.splice(source.index, 1);
      orderedWidgets.splice(destination.index, 0, reorderedItem);
      return { ...state, widgets: orderedWidgets };
    }
    default:
      return state;
  }
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(dashboardReducer, initState);

  useEffect(() => {
    try {
      const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedState) {
        dispatch({ type: "LOAD_STATE", payload: JSON.parse(storedState) });
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
    }
  }, [state]);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};
