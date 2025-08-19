// src/components/DataTable/DataTable.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "./DataTable";

type User = { id: number; name: string; email: string };

const cols = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
] as const;

const rows: User[] = [
  { id: 1, name: "Charlie", email: "c@x.com" },
  { id: 2, name: "Alice", email: "a@x.com" },
];

test("renders empty state", () => {
  render(<DataTable<User> data={[]} columns={cols as any} />);
  expect(screen.getByText("No data available")).toBeInTheDocument();
});

test("sorts by column", () => {
  render(<DataTable<User> data={rows} columns={cols as any} />);
  fireEvent.click(screen.getByRole("button", { name: /sort by name/i }));
  const cells = screen.getAllByRole("cell");
  // first data cell should be "Alice" after ascending sort
  expect(cells[0]).toHaveTextContent("Alice");
});

test("selects rows (multiple)", () => {
  let selected: User[] = [];
  render(
    <DataTable<User>
      data={rows}
      columns={cols as any}
      selectable
      onRowSelect={(s) => (selected = s)}
    />
  );
  fireEvent.click(screen.getByLabelText("Select row 1"));
  expect(selected.length).toBe(1);
});
