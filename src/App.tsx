import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./layout/Header";
import Dashboard from "./layout/Dashboard";
import { DashboardProvider } from "./core/context/DashboardContext";
import AddWidget from "./components/modals/AddWidget";
import DeleteWidget from "./components/modals/DeleteWidget";
import EditWidget from "./components/modals/EditWidget";
import LoginScreen from "./pages/LoginScreen";
import { AuthProvider, useAuth } from "./core/context/AuthContext";

const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-white text-xl">Loading session...</div>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const DashboardLayout: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen text-gray-200 font-sans">
        <Header />
        <main className="p-1 sm:p-2 lg:p-3">
          <Dashboard />
        </main>
        <AddWidget />
        <DeleteWidget />
        <EditWidget />
      </div>
    </DashboardProvider>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
