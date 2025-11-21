import { TodoItem } from "../../../core/types/widget.types";

export const checkedOnBottom = (todos: TodoItem[]): TodoItem[] => {
  return todos.sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
};
