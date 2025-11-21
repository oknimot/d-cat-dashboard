import React, { useEffect, useState } from "react";

import { NotesWidgetProps } from "../../core/types/widget.types";
import { useDashboard } from "../../core/context/DashboardContext";

const NotesWidget: React.FC<{ widget: NotesWidgetProps }> = ({ widget }) => {
  const { dispatch } = useDashboard();
  const [content, setContent] = useState(widget.config.content);

  // Sync local state if widget data changes from an external source (like import)
  // TODO: Find a better way to sync local state without disabling linter rule
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContent(() => widget.config.content);
  }, [widget]);

  const handleBlur = () => {
    if (content !== widget.config.content) {
      const notes = {
        ...widget,
        config: {
          ...widget.config,
          content,
        },
      };
      dispatch({ type: "UPDATE_WIDGET", payload: notes });
    }
  };

  return (
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      onBlur={handleBlur}
      placeholder="Type your notes here..."
      className="w-full h-full bg-transparent text-gray-400 resize-none focus:outline-none text-sm p-1"
      rows={4}
    />
  );
};

export default React.memo(NotesWidget);
