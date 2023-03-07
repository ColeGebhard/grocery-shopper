import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts, createProducts } from "../api/helpers";

const Products = (props) => {
    const { products, setProducts } = props;

    const [availible, setAvailible] = useState(true);
    const [name, setName] = useState("");
    const [description, setDesciption] = useState("");
    const [price, setPrice] = useState(0);
    const [quanity, setQuanity] = useState(5);


  useEffect(() => {
    getAllProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((e) => {
        console.error('Failed to get products')
      });
  }, [setProducts])

  const productSubmit = async (e) => {
    e.preventDefault();
    try {
    //   const result = await createCategory(name);

    //   console.log(result)
    //   return result;
    console.log("Place")
    } catch (e) {
      console.error(e);
      throw e;
    } finally {

    }
  }

  const { categoryName } = useParams();

  console.log(JSON.stringify(categoryName))
  const filteredProducts = products.filter(product => product.categoryName === categoryName)
console.log(filteredProducts)
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

      <h1>{categoryName}</h1>
        {filteredProducts.map((product) => {
            return (
                <div>
                    <h2>{product.name}</h2>
                      <p>{product.description}</p>
                      <p>{product.price}</p>
                </div>
            )
        })}
    </>
  )

}

export default Products;