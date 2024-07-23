import React, { useState } from "react";

interface Command {
  command: string;
  response: string;
}

const Console: React.FC = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([]);

  const handleCommand = (command: string): string => {
    switch (command.toLowerCase()) {
      case "help":
        return "Here is a list of commands: help, ...";
      default:
        return `Unknown command "${command.toLowerCase()}"`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const response = handleCommand(input);
      setHistory([...history, { command: input, response: response }]);
      setInput("");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900">
      <div className="h-[80vh] w-[90vh] text-white font-console p-4">
        <div className="border border-gray-700 p-2 h-full overflow-y-auto">
          <div className="mb-2">
            <p>Please write "help" for a list of commands</p>
          </div>
          {history.map((entry, index) => (
            <div key={index} className="mb-2">
              <div>
                <span className="text-green-500">&gt;</span> {entry.command}
              </div>
              <div>
                <span className="text-white">&gt;</span> {entry.response}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-800 text-white p-2 border border-gray-700 focus:outline-none"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Console;
