import React, { useState } from "react";

import { useAuth } from "../core/context/AuthContext";

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    await login();
    setIsLoggingIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">
          Welcome to Dynamic Dashboard
        </h1>
        <p className="text-gray-300 mb-8">
          Please sign in to continue and manage your personalized workspace.
        </p>
        <button
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="w-full inline-flex items-center justify-center bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 disabled:bg-gray-400"
        >
          {isLoggingIn ? "Signing In..." : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
