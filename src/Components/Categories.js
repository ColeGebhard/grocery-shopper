import React, { useState, useEffect } from "react";
import { getAllCategories, createCategory } from "../api/helpers";

const Catagories = (props) => {
  const { token } = props;
  const [categories, setCategories] = useState([]);
  const [availible, setAvailible] = useState(true);
  const [name, setName] = useState("");
  const [description, setDesciption] = useState("");
  const [price, setPrice] = useState(0);
  const [quanity, setQuanity] = useState(5);


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
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Log in!</button>
      </form>

      <h1>Categories</h1>
      {categories.map((category) => {
        return (
          <div>
            <h2>{category.name}</h2>
          </div>
        )
      })}
    </>
  )
}

export default Catagories;