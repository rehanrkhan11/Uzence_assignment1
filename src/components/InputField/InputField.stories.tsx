// src/components/InputField/InputField.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import InputField, { InputFieldProps } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    variant: { control: { type: "radio" }, options: ["filled", "outlined", "ghost"] },
    size: { control: { type: "radio" }, options: ["sm", "md", "lg"] },
    onChange: { action: "changed" },
  },
};
export default meta;
type Story = StoryObj<typeof InputField>;

const Template = (args: InputFieldProps) => {
  const [val, setVal] = useState(args.value ?? "");
  return (
    <div className="max-w-sm space-y-4">
      <div className="p-6 bg-white text-gray-900 rounded-lg shadow">
        <InputField {...args} value={val} onChange={(e) => setVal(e.target.value)} />
      </div>
      <div className="p-6 bg-gray-900 text-white rounded-lg shadow">
        {/* ✅ Dark mode preview */}
        <InputField {...args} value={val} onChange={(e) => setVal(e.target.value)} />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: "Username",
    placeholder: "Enter username",
    variant: "outlined",
    size: "md",
    helperText: "This will be your login name.",
  },
};

export const WithError: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: "Email",
    placeholder: "you@example.com",
    variant: "filled",
    invalid: true,
    errorMessage: "Invalid email address",
  },
};

export const WithClearButton: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: "Search",
    placeholder: "Type to search...",
    variant: "ghost",
    size: "lg",
    clearable: true,
  },
};

export const PasswordToggle: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: "Password",
    placeholder: "••••••••",
    type: "password",
    clearable: true,
  },
};

export const LoadingState: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: "Username",
    placeholder: "Checking availability...",
    loading: true,
    helperText: "We are validating your input...",
  },
};
