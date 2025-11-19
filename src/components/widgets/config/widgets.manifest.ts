import { WidgetType, type Widget } from "../../../core/types/widget.types";

import ChartWidget from "../ChartWidget";
import ListWidget from "../ListWidget";
import NotesWidget from "../NotesWidget";
import TableWidget from "../TableWidget";
import TodoWidget from "../TodoWidget";

/**
 * Represents the manifest data for a widget.
 */
export interface WidgetManifest {
  label: string;
  description: string;
  title: string;
  init: Widget["config"];
  component: React.ComponentType<{widget: Widget}>;
}

export const widgetsManifest: Record<WidgetType, WidgetManifest> = {
  [WidgetType.CHART]: {
    label: "Chart",
    description: "Display a bar chart.",
    title: "Chart Widget",
    init: { chartType: "bar" },
    component: ChartWidget as React.ComponentType<{ widget: Widget }>,
  },
  [WidgetType.TABLE]: {
    label: "Table",
    description: "Organize data in rows and columns.",
    title: "Table Widget",
    init: { rowCount: 3, colCount: 3 },
    component: TableWidget as React.ComponentType<{ widget: Widget }>,
  },
  [WidgetType.LIST]: {
    label: "List",
    description: "Show a simple list of items.",
    title: "List Widget",
    init: { itemCount: 3 },
    component: ListWidget as React.ComponentType<{ widget: Widget }>,
  },
  [WidgetType.NOTES]: {
    label: "Notes",
    description: "Write down quick thoughts and reminders.",
    title: "Notes Widget",
    init: { content: "" },
    component: NotesWidget as React.ComponentType<{ widget: Widget }>,
  },
  [WidgetType.TODO]: {
    label: "Todo List",
    description: "Track your tasks and get things done.",
    title: "Todo Widget",
    init: { items: [] },
    component: TodoWidget as React.ComponentType<{ widget: Widget }>, 
  },
};
