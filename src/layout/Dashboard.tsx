import React from "react";

const Dashboard: React.FC = () => {
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
};

export default Dashboard;
