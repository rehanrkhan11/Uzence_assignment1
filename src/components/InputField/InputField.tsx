import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: string;
  clearable?: boolean;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 dark:bg-gray-800 border-transparent",
  outlined: "border border-gray-300 dark:border-gray-600",
  ghost: "bg-transparent border-b border-gray-400",
};

export default function InputField({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <div className="relative flex items-center">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type === "password" && showPassword ? "text" : type}
          disabled={disabled}
          className={`w-full rounded-md focus:ring-2 focus:ring-blue-500 
            ${sizeClasses[size]} 
            ${variantClasses[variant]} 
            ${invalid ? "border-red-500" : ""} 
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-2 text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
        {clearable && value && (
          <button
            type="button"
            className="absolute right-2 text-sm"
            onClick={() =>
              onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            ❌
          </button>
        )}
      </div>
      {helperText && !errorMessage && (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      )}
      {errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
