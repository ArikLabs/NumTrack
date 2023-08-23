import { useEffect, useState } from "react";
import "./App.css";

const backendUrl = "http://localhost:8302";

interface HistoricalValue {
  user: string;
  operation: string;
  totalCount: number;
}

function App() {
  const [token, setToken] = useState<string | undefined>();
  const [counter, setCounter] = useState<number>(0);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);

  const [historicalValues, setHistoricalValues] = useState<HistoricalValue[]>(
    [],
  );

  useEffect(() => {
    if (token) {
      loadCounter();
    }
  }, [token]); // Вказуємо залежність від token
  async function login() {
    const username = prompt("Username:");
    const password = prompt("Password:");

    const response = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.token);
      setUserPermissions(data.permissions);
    } else {
      alert("Authentication failed");
    }
  }

  async function loadCounter() {
    const response = await fetch(`${backendUrl}/counter`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setCounter(data.count);
  }

  function hasPermission(permission: string): boolean {
    return userPermissions.includes(permission);
  }

  async function increment() {
    await fetch(`${backendUrl}/counter/incr`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadCounter();
  }

  async function decrement() {
    await fetch(`${backendUrl}/counter/decr`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadCounter();
  }

  async function getHistoricalValues() {
    const response = await fetch(`${backendUrl}/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    setHistoricalValues(data.history);

    if (data.history.length === 0) {
      setCounter(0);
      return;
    }

    setCounter(data.history[data.history.length - 1].totalCount);
  }

  return (
    <div className="App">
      {!token ? (
        <div>
          <h1>Counter App</h1>
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div>
          <h1>Counter App</h1>
          <div className="counter">
            <h2>Counter Value: {counter}</h2>
            <button
              onClick={increment}
              disabled={!hasPermission("counter:incr")}
            >
              Increment
            </button>
            <button
              onClick={decrement}
              disabled={!hasPermission("counter:decr")}
            >
              Decrement
            </button>
            <button
              onClick={getHistoricalValues}
              disabled={!hasPermission("counter:read")}
            >
              Load Historical Values
            </button>
          </div>
          <div className="historical">
            <h3>Historical Values</h3>
            <ul className="historical-list">
              {historicalValues.map((item, index) => (
                <li key={index} className="historical-item">
                  <div className="historical-text">
                    User: {item.user}, Operation: {item.operation}, Total Count:{" "}
                    {item.totalCount}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
