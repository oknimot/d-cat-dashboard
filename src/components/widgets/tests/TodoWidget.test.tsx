import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TodoWidgetProps, WidgetType } from "../../../core/types/widget.types";
import TodoWidget from "../TodoWidget";
import { checkedOnBottom } from "../utils/utils";

const mockDispatch = vi.fn();
vi.mock("../../../core/context/DashboardContext", () => ({
  useDashboard: () => ({
    dispatch: mockDispatch,
  }),
}));

vi.mock("uuid", () => ({
  v4: () => "new-mock-id",
}));

const mockWidget: TodoWidgetProps = {
  id: "widget-1",
  title: "My Todos",
  type: WidgetType.TODO,
  config: {
    items: [
      { id: "item-1", text: "Buy Milk", completed: false },
      { id: "item-2", text: "Walk Dog", completed: true },
    ],
  },
};

describe("TodoWidget", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders initial todo items", async () => {
    render(<TodoWidget widget={mockWidget} />);

    expect(screen.getByText("Buy Milk")).toBeInTheDocument();
    expect(screen.getByText("Walk Dog")).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  it("adds a new todo item", async () => {
    render(<TodoWidget widget={mockWidget} />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Read Book" } });
    fireEvent.click(addButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_WIDGET",
      payload: {
        ...mockWidget,
        config: {
          items: checkedOnBottom([
            ...mockWidget.config.items,
            { id: "new-mock-id", text: "Read Book", completed: false },
          ]),
        },
      },
    });

    expect(input).toHaveValue("");
  });

  it("does not add empty todo item", () => {
    render(<TodoWidget widget={mockWidget} />);

    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("toggles item completion status", () => {
    render(<TodoWidget widget={mockWidget} />);

    const firstItemCheckbox = screen.getAllByRole("checkbox")[0];

    fireEvent.click(firstItemCheckbox);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_WIDGET",
      payload: {
        ...mockWidget,
        config: {
          items: [
            { id: "item-1", text: "Buy Milk", completed: true },
            { id: "item-2", text: "Walk Dog", completed: true },
          ],
        },
      },
    });
  });

  it("deletes a todo item", () => {
    render(<TodoWidget widget={mockWidget} />);

    const deleteButtons = screen.getAllByTestId("trash-icon");
    const firstDeleteBtn = deleteButtons[0].closest("button");

    if (!firstDeleteBtn) throw new Error("Delete button not found");

    fireEvent.click(firstDeleteBtn);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_WIDGET",
      payload: {
        ...mockWidget,
        config: {
          items: [{ id: "item-2", text: "Walk Dog", completed: true }],
        },
      },
    });
  });
});
