import "./Home.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { getAllProducts, getAllCategories } from "../api/helpers";

const Home = (props) => {

  const {token, logout, currentCart, me} = props;
  const navigate = useNavigate();

  if(currentCart === null || undefined) {
    return 0;
  }


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

  console.log(currentCart)

  if (token) {

    const totalItems = me && currentCart && currentCart.items ? currentCart.items.length : 0;
    console.log(totalItems)

    return(
      <>
      <div id="header">
        <button className="logout" onClick={logout}>Log Out</button>
        <a id="title" href="/">ACL Groceries</a>
        <div id="cartPlusCount">
          <span className="cartCount">{totalItems}</span>
          <input alt="cart" type="image" src={require(`../img/cart.jpg`)} onClick={() => {navigate("/carts")}} className="cartImage"/>
          
        </div>
      </div>
      </>
    )
  }




  return (
    <>
      <div id="header">
      <a id="title" href="/">ACL Groceries</a>
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