export enum WidgetType {
  CHART = "CHART",
  LIST = "LIST",
  TABLE = "TABLE",
  TODO = "TODO",
  NOTES = "NOTES",
}

export interface BaseWidget {
  id: string;
  title: string;
  type: WidgetType;
}

export interface ChartWidget extends BaseWidget {
  type: WidgetType.CHART;
  config: {
    chartType: "bar";
  };
}

export interface ListWidget extends BaseWidget {
  type: WidgetType.LIST;
  config: {
    itemCount: number;
  };
}

export interface TableWidget extends BaseWidget {
  type: WidgetType.TABLE;
  config: {
    rowCount: number;
    colCount: number;
  };
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoWidget extends BaseWidget {
  type: WidgetType.TODO;
  config: {
    items: TodoItem[];
  };
}

export interface NotesWidget extends BaseWidget {
  type: WidgetType.NOTES;
  config: {
    content: string;
  };
}

export type Widget =
  | ChartWidget
  | ListWidget
  | TableWidget
  | TodoWidget
  | NotesWidget;
