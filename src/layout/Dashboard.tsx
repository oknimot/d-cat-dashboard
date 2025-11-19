import React from "react";

import { useDashboard } from "../core/context/DashboardContext";
import WidgetWrapper from "../components/wrappers/WidgetWrapper";

const Dashboard: React.FC = () => {
  const { state } = useDashboard();

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

  return (
    <div>
      {state.widgets.map((widget) => (
        <WidgetWrapper key={widget.id} widget={widget} />
      ))}
    </div>
  );
};

export default Dashboard;
