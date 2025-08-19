import React, { useState } from "react";

interface LoginPageProps {
  onLogin: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function LoginPage({ onLogin, theme, toggleTheme }: LoginPageProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      onLogin();
    } else {
      alert("Wrong password! Try again.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 w-80">
        <h2 className="text-xl font-bold mb-2 text-center">Login</h2>
        {/* 🔹 Instruction text */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
          Use <strong>admin123</strong> as password
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-black"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Login
          </button>
        </form>

        <button
          onClick={toggleTheme}
          className="w-full mt-3 rounded-lg border px-4 py-2"
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    </div>
  );
}
