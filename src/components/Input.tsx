import React from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="border p-2 w-full rounded bg-white dark:bg-neutral-800 dark:border-neutral-600"
    />
  );
};

export default Input;
