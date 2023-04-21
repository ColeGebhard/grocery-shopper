import React, { useState, useEffect } from "react";
import { getAllCategories, createCategory, getAllProducts, deleteCategory } from "../api/helpers";
import { useNavigate } from "react-router";

const Categories = (props) => {
  const { categories, setCategories, products, setProducts, me } = props;

  const [name, setName] = useState("");
  const [photos, setPhotos] = useState("");


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
        console.log(products); // log the received products
        setProducts(products);
      })
      .catch((e) => {
        console.error('Failed to get products')
      });
  }, [setProducts])


  const catSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createCategory({ name, photos });
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
  console.log(products)


  const handleDelete = async (categoryId) => {
    try {
      const result = await deleteCategory(categoryId);
      // console.log(result)
      if (result === false) {
        window.alert('Successfully deleted');
        window.location.reload();
      } else {
        window.alert('Cannot delete category because it contains products')
      }
    } catch (e) {
      if (e.message === 'Cannot delete category because it contains products') {
        window.alert('Cannot delete category because it contains products');
      } else {
        console.error(e);
        // Handle other errors
      }
    }
  };



  return products ? (
    <>
      <div className="banner-container">
        <img className="banner" src={require(`../img/food-groups.png`)} alt="Placeholder" />
        <div className="banner-summary">
          <h1>Made For the Health of Our Community</h1>
          <p>Discover our local, organic grocery store!
            We offer fresh and healthy produce, meats,
            and pantry staples directly from local farms
            and artisans. Shop with us for nourishing
            foods that support local growers and promote
            a sustainable community.
          </p>
        </div>
      </div>
      {me.username === "Admin" ?
        <form id="productForm" onSubmit={catSubmit}>
          <input
            type="text"
            placeholder="Category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Make Category</button>
        </form> :
        null}
      <div className="mainProductPage">
        <span className="categoryCards">
          {categories.map((category) => {
            return (
              <div key={category.id} className="categoryLinks">
                <h2>
                  <button id="catergoryClick" onClick={() => { navigate(`category/${category.id}`) }}>{category.name}</button>
                </h2>
                <img className="categoryImg"src={require(`../img/${category.photos}`)} alt={category.name} />
                {me.username === "Admin" ?
                  <button id="deleteCategoryButton" onClick={() => { handleDelete(category.id) }}>
                    Delete
                  </button> :
                  null
                }
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
                    onClick={() => { navigate(`category/product/${product.id}`) }}
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
              }) : <p>No product found</p>}

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