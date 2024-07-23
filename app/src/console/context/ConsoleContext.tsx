// src/console/context/ConsoleContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Command, handleCommand } from "../commands/commandsHandler";

interface ConsoleContextProps {
  input: string;
  history: Command[];
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setHistory: React.Dispatch<React.SetStateAction<Command[]>>;
  handleSubmit: (e: React.FormEvent) => void;
}

const ConsoleContext = createContext<ConsoleContextProps | undefined>(
  undefined
);

export const useConsole = (): ConsoleContextProps => {
  const context = useContext(ConsoleContext);
  if (!context) {
    throw new Error("useConsole must be used within a ConsoleProvider");
  }
  return context;
};

interface ConsoleProviderProps {
  children: ReactNode;
}

export const ConsoleProvider: React.FC<ConsoleProviderProps> = ({
  children,
}) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const response = await handleCommand(input);
      if (response.response === "COMMAND_CLEAR") {
        setHistory([]);
      } else {
        setHistory([...history, response]);
      }
      setInput("");
    }
  };

  return (
    <ConsoleContext.Provider
      value={{ input, history, setInput, setHistory, handleSubmit }}
    >
      {children}
    </ConsoleContext.Provider>
  );
};
