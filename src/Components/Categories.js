import React, { useState, useEffect } from "react";
import { getAllCategories, createCategory, getAllProducts } from "../api/helpers";

const Catagories = (props) => {
  const { categories, setCategories, name, setName, products, setProducts } = props;


  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((e) => {
        console.error('Failed to get category')
      });
  }, [setCategories])

  useEffect(() => {
    getAllProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((e) => {
        console.error('Failed to get products')
      });
  }, [setProducts])

  console.log(products)


  const productSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createCategory(name);

      console.log(result)
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {

    }
  }


  return (
    <>
      <form id="loginForm" onSubmit={productSubmit}>
        <input
          type="text"
          placeholder="Category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Make Category</button>
      </form>
      <div className="mainProductPage">
        <span>
          <h1>Categories</h1>
          {categories.map((category) => {
            return (
              <div className="categoryLinks">
                <h2><a id="catergoryClick" href={`category/${category.name}`}>{category.name}</a></h2>
              </div>
            )
          })}
        </span>
        <span>
          <h1>Products</h1>
          <span className="productCards">
          {products.map((product) => {
            return (
              <div className="productCard">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <img alt="Stuff">{product.photos}</img>
              </div>
            )
          })}
          </span>
        </span>
      </div>
    </>
  )

}

export default Catagories;