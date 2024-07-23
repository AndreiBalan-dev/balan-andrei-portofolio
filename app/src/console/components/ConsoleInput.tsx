import React from "react";

interface ConsoleInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ConsoleInput: React.FC<ConsoleInputProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full bg-gray-800 text-white p-2 border border-gray-700 focus:outline-none"
        autoFocus
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 ml-2 font-roboto"
      >
        Submit
      </button>
    </form>
  );
};

export default ConsoleInput;
