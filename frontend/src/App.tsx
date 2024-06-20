// frontend/src/App.tsx
import React, { useEffect, useState } from "react";
import { fetchBackendMessage } from "./api";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const getMessage = async () => {
      const msg = await fetchBackendMessage();
      setMessage(msg);
    };
    getMessage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
};

export default App;
