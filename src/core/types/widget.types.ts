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

export interface ChartWidgetProps extends BaseWidget {
  type: WidgetType.CHART;
  config: {
    chartType: "bar";
  };
}

export interface ListWidgetProps extends BaseWidget {
  type: WidgetType.LIST;
  config: {
    team: string;
  };
}

export interface TableWidgetProps extends BaseWidget {
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

export interface TodoWidgetProps extends BaseWidget {
  type: WidgetType.TODO;
  config: {
    items: TodoItem[];
  };
}

export interface NotesWidgetProps extends BaseWidget {
  type: WidgetType.NOTES;
  config: {
    content: string;
  };
}

export type Widget =
  | ChartWidgetProps
  | ListWidgetProps
  | TableWidgetProps
  | TodoWidgetProps
  | NotesWidgetProps;

export type WidgetConfig =
  | ChartWidgetProps["config"]
  | ListWidgetProps["config"]
  | TableWidgetProps["config"]
  | TodoWidgetProps["config"]
  | NotesWidgetProps["config"];
