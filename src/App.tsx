import React, { useState } from "react";
import InputField from "./components/InputField/InputField";
import DataTable, { Column } from "./components/DataTable/DataTable";
import LoginPage from "./components/LoginPage";
import "./App.css";

type User = { id: number; name: string; email: string };

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
];

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
  ]);

  const [newUser, setNewUser] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddUser = () => {
    if (!newUser.trim()) return;
    setUsers((prev) => [
      ...prev,
      { id: Date.now(), name: newUser, email: `${newUser}@example.com` },
    ]);
    setNewUser("");
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // If not logged in → show login page
  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={() => setIsLoggedIn(true)}
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      />
    );
  }

  // After login → show main app
  return (
    <div
      className={`min-h-screen p-6 space-y-8 ${
        theme === "light"
          ? "bg-white text-gray-900"
          : "bg-gray-950 text-gray-100"
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">React Component Assignment</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            className="rounded-lg border px-4 py-2"
          >
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
          {/* 🔹 Logout button */}
          <button
            onClick={() => setIsLoggedIn(false)}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* InputField Section */}
      <div className="max-w-md space-y-4">
        <InputField
          label="New User"
          placeholder="Enter name"
          value={newUser}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewUser(e.target.value)
          }
          helperText="Type a name and click Add"
          clearable
          variant="outlined"
          size="md"
        />
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          disabled={!newUser}
          onClick={handleAddUser}
        >
          Add User
        </button>

        <InputField
          label="Password"
          placeholder="••••••••"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          clearable
          variant="outlined"
          size="md"
          helperText="Click the eye icon to show/hide password"
        />
      </div>

      {/* DataTable Section */}
      <div className="max-w-3xl space-y-4">
        <h2 className="text-xl font-semibold">User Table</h2>

        <InputField
          label="Search"
          placeholder="Search by name/email"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          clearable
          variant="ghost"
          size="sm"
          loading={loading}
        />

        <DataTable<User>
          data={filtered}
          columns={columns}
          loading={loading}
          selectable
          selectionMode="multiple"
          onRowSelect={(rows) => console.log("Selected rows:", rows)}
        />
      </div>
    </div>
  );
}
