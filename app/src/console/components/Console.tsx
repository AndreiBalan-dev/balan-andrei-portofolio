import React from "react";
import { useConsole } from "../context/ConsoleContext";
import ConsoleInput from "./ConsoleInput";
import ConsoleHistory from "./ConsoleHistory";

const Console: React.FC = () => {
  const { input, setInput, handleSubmit } = useConsole();

  return (
    <div className="flex items-center justify-center bg-gray-900">
      <div className="h-[80vh] w-[90vh] text-white font-console p-4">
        <ConsoleHistory />
        <div className="mt-2">
          <ConsoleInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Console;
