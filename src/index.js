import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter, Link} from 'react-router-dom';
import {
  Register,
  Login
} from "./Components"

export const TOKEN_STORAGE_KEY = "user-token"
const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
export const USER_STORAGE_KEY = "user-username";
const storedUser = localStorage.getItem(USER_STORAGE_KEY);

const App = () => {
  const [token, setToken] = useState(storedToken);
  const [username, setUsername] = useState(storedUser);
  const [password, setPassword] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact path="/"
          element={
            "Tada! This is a placeholder for the Home component"
            // <Home />
            // This is a placeholder, Home does not exist yet;
          }
        />
        <Route
          exact path="/register"
          element={
            <Register 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            token={token}
            setToken={setToken}
            />
          }
        />
        <Route
          exact path="/login"
          element={
            <Login 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            token={token}
            setToken={setToken}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

