// src/components/DataTable/DataTable.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import DataTable, { Column } from "./DataTable";

type User = {
  id: number;
  name: string;
  email: string;
};

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable,
  argTypes: {
    loading: { control: "boolean" },
    selectable: { control: "boolean" },
    selectionMode: {
      control: { type: "radio" },
      options: ["single", "multiple"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof DataTable<User>>;

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
];

const sampleUsers: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

// 🔹 Base template with state for row selection
const Template = (args: any) => {
  const [selected, setSelected] = useState<User[]>([]);
  return (
    <div className="max-w-2xl p-6 bg-white dark:bg-gray-900">
      <DataTable<User>
        {...args}
        onRowSelect={(rows) => setSelected(rows)}
      />
      {selected.length > 0 && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Selected: {selected.map((u) => u.name).join(", ")}
        </div>
      )}
    </div>
  );
};

// ✅ Default table
export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    data: sampleUsers,
    columns,
    selectable: true,
    selectionMode: "multiple",
  },
};

// ✅ Loading state
export const Loading: Story = {
  render: (args) => <Template {...args} />,
  args: {
    data: [],
    columns,
    loading: true,
  },
};

// ✅ Empty state
export const Empty: Story = {
  render: (args) => <Template {...args} />,
  args: {
    data: [],
    columns,
  },
};

// ✅ Single row selection
export const SingleSelection: Story = {
  render: (args) => <Template {...args} />,
  args: {
    data: sampleUsers,
    columns,
    selectable: true,
    selectionMode: "single",
  },
};
