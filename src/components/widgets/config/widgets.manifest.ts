import { WidgetType } from "../../../core/types/widget.types";

/**
 * Represents the manifest data for a widget option in the adding widget to dashboard modal.
 */
export interface WidgetManifest {
  label: string;
  description: string;
  title: string;
}

export const widgetsManifest: Record<WidgetType, WidgetManifest> = {
  [WidgetType.CHART]: {
    label: "Chart",
    description: "Display a bar chart.",
    title: "Chart Widget",
  },
  [WidgetType.TABLE]: {
    label: "Table",
    description: "Organize data in rows and columns.",
    title: "Table Widget",
  },
  [WidgetType.LIST]: {
    label: "List",
    description: "Show a simple list of items.",
    title: "List Widget",
  },
  [WidgetType.NOTES]: {
    label: "Notes",
    description: "Write down quick thoughts and reminders.",
    title: "Notes Widget",
  },
  [WidgetType.TODO]: {
    label: "Todo List",
    description: "Track your tasks and get things done.",
    title: "Todo Widget",
  },
};
