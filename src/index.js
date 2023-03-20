import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect, useState, useCallback } from 'react';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import { isUser, createCart, getAllCarts, getCart } from './api/helpers';

import {
  Register,
  Login,
  Categories,
  Products,
  Carts,
  Home,
  SingleProduct
} from "./Components"

export const TOKEN_STORAGE_KEY = "user-token";
const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
export const USER_STORAGE_KEY = "user-username";
const storedUser = localStorage.getItem(USER_STORAGE_KEY);

const App = () => {
  const [token, setToken] = useState(storedToken);
  const [username, setUsername] = useState(storedUser);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [me, setMe] = useState('');
  const [name, setName] = useState("");
  const [currentCart, setCurrentCart] = useState([])
  const [allCarts, setAllCarts] = useState([]);

  //Worked for me but can change

  const logout = useCallback(() => {
    const confirm = window.confirm('Are you sure you wis to logout?')
    if (confirm) {

      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(token);


      setToken('');
      setMe(null);
      window.location.replace('http://localhost:3000/#/');
      window.location.reload();
      window.alert('Log out success');
    }
  }, [token]);

  const createCartFunction = async () => {
    try {
      const me = await isUser(token);

      if (me) {
        const userId = me.id;
        let cartId = localStorage.getItem('cartId');
        let cart;

        if (cartId) {
          const existingCart = await getCart(cartId);
          if (existingCart) {
            cart = existingCart;
          } else {
            localStorage.removeItem('cartId');
          }
        }

        if (!cart) {
          cart = await createCart(userId);
          localStorage.setItem('cartId', cart.id);
        }

        setCurrentCart(cart);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  useEffect(() => {
    if (token) {
      isUser(token)
        .then((me) => {
          setMe(me);
        })
        .catch((e) => {
          throw new Error(`Failed to fetch myself.`);
        });
    }

  }, [token]);

  window.onload = function () {
    createCartFunction()
  };

  console.log(me)

  if (token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            exact path="/"
            element={
              <>
                <Home
                  username={username}
                  token={token}
                  setToken={setToken}
                  products={products}
                  setProducts={setProducts}
                  me={me}
                  logout={logout}
                />
                <Categories
                  categories={categories}
                  setCategories={setCategories}
                  name={name}
                  setName={setName}
                  products={products}
                  setProducts={setProducts}
                  me={me}
                />
              </>
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
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}

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
                setName={setName}
                products={products}
                setProducts={setProducts} />
            }
          />
          <Route
            path='/category/:categoryName'
            element={
              <Products
                products={products}
                setProducts={setProducts}
                categories={categories}
                setCategories={setCategories}
              />
            }
          />
          <Route
            path='/category/product/:prodId'
            element={
              <SingleProduct
                products={products}
                setProducts={setProducts}
                currentCart={currentCart}
                setCurrentCart={setCurrentCart}
                me={me}
              />
            }
          />
          <Route
            path='/carts'
            element={
              <Carts
                products={products}
                categories={categories}
                currentCart={currentCart}
                setCurrentCart={setCurrentCart}
                allCarts={allCarts}
                setAllCarts={setAllCarts}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            exact path="/"
            element={
              <>
                <Home
                  username={username}
                  token={token}
                  setToken={setToken}
                  products={products}
                  setProducts={setProducts}
                  me={me}
                />
                <Categories
                  categories={categories}
                  setCategories={setCategories}
                  name={name}
                  setName={setName}
                  products={products}
                  setProducts={setProducts}
                  me={me}
                />
              </>
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
                setName={setName}
                products={products}
                setProducts={setProducts} />
            }
          />
          <Route
            path='/category/:categoryName'
            element={
              <Products
                products={products}
                setProducts={setProducts}
                categories={categories}
                setCategories={setCategories}
              />
            }
          />
          <Route
            path='/category/product/:prodId'
            element={
              <SingleProduct
                products={products}
                setProducts={setProducts}
                currentCart={currentCart}
                setCurrentCart={setCurrentCart}
                me={me}
              />
            }
          />
          <Route
            path='/carts'
            element={
              <Carts
                products={products}
                categories={categories}
                currentCart={currentCart}
                setCurrentCart={setCurrentCart}
                allCarts={allCarts}
                setAllCarts={setAllCarts}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

