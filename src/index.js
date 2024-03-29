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
  SingleProduct,
  Checkout, 
  CheckoutSuccess
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a 1-second loading time
  }, []);



  //Worked for me but can change

  const logout = useCallback(() => {
    const confirm = window.confirm('Are you sure you wish to logout? All cart progress will be lost.')
    if (confirm) {

      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(token);
      localStorage.removeItem('cartId');

      setToken('');
      setMe(null);
      window.location.replace('https://acl-grocery.onrender.com/');
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

  if (token) {
    return loading ? (
      <span className="loader">
        <span className="loader-inner">
        </span>
      </span>
    ) : (
      <BrowserRouter>
            <div className={`App ${loading ? 'loading' : ''}`}>
        {loading && <div className="loader"></div>}
        <Home
          username={username}
          token={token}
          setToken={setToken}
          products={products}
          setProducts={setProducts}
          me={me}
          logout={logout}
          currentCart={currentCart}
                  />

        <Routes>
          <Route
            exact path="/"
            element={
              <>
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
                setProducts={setProducts}
                me={me} />
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
                me={me}
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
          <Route
            path='/checkout'
            element={
              <Checkout
                username={username}
                firstName={firstName}
                lastName={lastName}
                products={products}
                categories={categories}
                currentCart={currentCart}
                setCurrentCart={setCurrentCart}
                allCarts={allCarts}
                setAllCarts={setAllCarts}
              />
            }
          />
          <Route
            path='/checkout/success'
            element={
              <CheckoutSuccess
                username={username}
                firstName={firstName}
                lastName={lastName}
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
        </div>
      </BrowserRouter>
    )
  } else {
    return loading ? (
      <span className="loader">
        <span className="loader-inner">
        </span>
      </span>
    ) : (
      <BrowserRouter>
        <Home
          username={username}
          token={token}
          setToken={setToken}
          products={products}
          setProducts={setProducts}
          me={me}
        />
        <Routes>

          <Route
            exact path="/"
            element={
              <>
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
                setProducts={setProducts}
                me={me} />
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
                me={me}
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

