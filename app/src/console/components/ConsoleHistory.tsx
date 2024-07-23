import React, { useEffect, useRef } from "react";
import { useConsole } from "../context/ConsoleContext";

const ConsoleHistory: React.FC = () => {
  const { history } = useConsole();
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = historyRef.current;

      const threshold = 200;
      const isCloseToBottom =
        scrollHeight - scrollTop - clientHeight < threshold;

      if (isCloseToBottom) {
        historyRef.current.scrollTop = scrollHeight;
      }
      console.log("---------");
      console.log(isCloseToBottom);
      console.log(scrollHeight);
      console.log(scrollTop);
      console.log(clientHeight);
      console.log(scrollHeight - scrollTop - clientHeight);
    }
  }, [history]);

  return (
    <div
      className="border border-gray-700 p-2 h-full overflow-y-auto custom-scrollbar"
      ref={historyRef}
    >
      <div className="mb-2">
        <p>Please write "help" for a list of commands</p>
      </div>
      {history.map((entry, index) => (
        <div key={index} className="mb-2 break-words">
          <div>
            <span className="text-green-500">&gt;</span> {entry.command}
          </div>
          <div>
            <span className="text-white">&gt;</span> {entry.response}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConsoleHistory;
