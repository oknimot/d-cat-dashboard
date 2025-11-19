import React from "react";

import Header from "./layout/Header";
import Dashboard from "./layout/Dashboard";
import { DashboardProvider } from "./core/context/DashboardContext";

const App: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen text-gray-200 font-sans">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
          <Dashboard />
        </main>
      </div>
    </DashboardProvider>
  );
};

export default App;
