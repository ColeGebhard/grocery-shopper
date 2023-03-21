import "./Home.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { getAllProducts, getAllCategories } from "../api/helpers";

const Home = (props) => {

  const {token, setToken, username, products, setProducts, logout} = props;
  const navigate = useNavigate();

  //Uncomment if want different

  // useEffect(() => {
  //   try {
  //     getAllProducts()
  //     .then((results) => {
  //       setProducts(results);
  //     })
  //   } catch (e) {
  //     console.error("Failed to fetch products on homepage");
  //     throw e;
  //   }
  // }, [])

  if (token) {
    return(
      <>
      <div id="header">
        <button className="logout" onClick={logout}>Log Out</button>
        <h3 id="title" onClick={() => {navigate("/")}}>ACL Groceries</h3>

        <input alt="cart" type="image" src={require(`../img/cart.jpg`)} onClick={() => {navigate("/carts")}} className="cartImage"/>
        
      </div>
      </>
    )
  }




  return (
    <>
      <div id="header">
        <h3 id="title" onClick={() => {navigate("/")}}>ACL Groceries</h3>
        <div id="buttonContainer">
          <button className="logout" id="loginButton" onClick={() => {navigate("/login")}}>Login</button>
        </div>
      </div>
      {/* {'I added the category page to home page, might be simple'} */}
      {/* <div>
        <h3>
          Products
        </h3>
        {products.map((product) => {
                return (
                    <div className="individualProduct" key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p> 
                        <p>placeholder</p>
                    </div>
                )
            })}
      </div> */}
    </>
  )
}

export default Home;