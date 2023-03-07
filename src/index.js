import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import {
  Register,
  Login,
  Categories,
  Products
} from "./Components"

export const TOKEN_STORAGE_KEY = "user-token";
const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
export const USER_STORAGE_KEY = "user-username";
const storedUser = localStorage.getItem(USER_STORAGE_KEY);

const App = () => {
  const [token, setToken] = useState(storedToken);
  const [username, setUsername] = useState(storedUser);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [availible, setAvailible] = useState(true);
  const [name, setName] = useState("");
  const [description, setDesciption] = useState("");
  const [price, setPrice] = useState(0);
  const [quanity, setQuanity] = useState(5);

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
              setToken={setToken}
              email={email}
              setEmail={setEmail}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
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
        <Route
          exact path="/category"
          element={
            <Categories 
            categories={categories}
            setCategories={setCategories}
            name={name}
            setName={setName}/>
          }
        />
        <Route 
          path='/category/:categoryName'
          element={
            <Products
            products={products}
            setProducts={setProducts}
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

