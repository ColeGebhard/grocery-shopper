import React, { useState, useEffect } from "react";
import { getAllCategories, createCategory } from "../api/helpers";

const Catagories = (props) => {
  const { categories, setCategories, name, setName } = props;


  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((e) => {
        console.error('Failed to get category')
      });
  }, [setCategories])

  console.log(categories)

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

      <h1>Categories</h1>
      {categories.map((category) => {
        return (
          <div>
            <h2><a id="catergoryClick" href={`category/${category.name}`}>{category.name}</a></h2>
          </div>
         )
      })}
    </>
  )

}

export default Catagories;