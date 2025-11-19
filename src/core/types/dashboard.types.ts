import type { DropResult } from "@hello-pangea/dnd";

import type { Widget, WidgetType } from "./widget.types";

export interface DashboardState {
  widgets: Widget[];
  isAddModalOpen: boolean;
}

export type DashboardAction =
  | { type: "LOAD_STATE"; payload: DashboardState }
  | { type: "OPEN_ADD_MODAL" }
  | { type: "CLOSE_ADD_MODAL" }
  | { type: "ADD_WIDGET"; payload: WidgetType }
  | { type: "UPDATE_WIDGET"; payload: Widget }
  | { type: "REORDER_WIDGETS"; payload: DropResult };
