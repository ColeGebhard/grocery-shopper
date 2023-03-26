import React, { useState, useEffect } from "react";
import { getAllCategories, createCategory, getAllProducts } from "../api/helpers";
import { useNavigate } from "react-router";

const Categories = (props) => {
  const { categories, setCategories, products, setProducts, me } = props;

  const [name, setName] = useState("");

  const navigate = useNavigate();


console.log(me)

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

  const catSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createCategory(name);
      console.log(result);
      setCategories([...categories, result]);
      setName("");
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  console.log(categories)


  return products ?(
    <>
      {/* {'sorta stopped working dont thinkg we need and just seed'} */}
      {me.username === "Admin"  ?
        <form id="productForm" onSubmit={catSubmit}>
        <input
          type="text"
          placeholder="Category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Make Category</button>
      </form>:
      null}
      <div className="mainProductPage">
        <span className="categoryCards">
          {categories.map((category) => {
            return (
              <div key={category.id} className="categoryLinks">
                <h2><button id="catergoryClick" onClick={() => {navigate(`category/${category.name}`)}}>{category.name}</button></h2>
              </div>
            )
          })}
        </span>
        <span className="productHeader">
          <h1 className="productHeader">All Products</h1>
          <span className="productCards">
            {Array.isArray(products) && products.length > 0 ?
            products.map((product) => {
              return (
                <button key={product.id} 
                onClick={() => {navigate(`category/product/${product.id}`)}}
                className="productCard">

                  <div className="categoryImage">
                    {product.photos ? (
                      <img
                        src={product.photos.startsWith('http') || product.photos.startsWith('https') ? product.photos : require(`../img/${product.photos}`)}
                        alt={product.name}
                      />
                    ) : (
                      <img src={require(`../img/placeholder-image.png`)} alt="Placeholder" />
                    )}
                  </div>
                  <div>
                    <h2>{product.name}</h2>
                    <p>${product.price.toFixed(2)}</p>
                  </div>
                </button>
              )
            }): <p>No product found</p>}

          </span>
        </span>

      </div>
    </>
  ) : (
    <span className="loader">
    <span className="loader-inner">
    </span>
  </span>
  )

}

export default Categories;