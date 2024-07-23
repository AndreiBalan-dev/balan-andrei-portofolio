import React from "react";
import Console from "./console/components/Console";
import { ConsoleProvider } from "./console/context/ConsoleContext";

const App: React.FC = () => {
  return (
    <div className="h-screen bg-gray-900">
      <ConsoleProvider>
        <Console />
      </ConsoleProvider>
    </div>
  );
};

export default App;
