import React, { createContext, useContext, useEffect, useReducer } from "react";

import type { DashboardAction, DashboardState } from "../types/dashboard.types";

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
    case "ADD_WIDGET":
      console.log(action.payload);
      return { ...state, widgets: [...state.widgets] };
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
