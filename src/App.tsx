import React from "react";

import Header from "./layout/Header";
import Dashboard from "./layout/Dashboard";
import { DashboardProvider } from "./core/context/DashboardContext";
import AddWidget from "./components/modals/AddWidget";
import DeleteWidget from "./components/modals/DeleteWidget";

const App: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen text-gray-200 font-sans">
        <Header />
        <main className="p-1 sm:p-2 lg:p-3">
          <Dashboard />
        </main>
        <AddWidget />
        <DeleteWidget />
      </div>
    </DashboardProvider>
  );
};

export default App;
