import React, { useState, useEffect } from "react";
import { getAllCategorys } from "../api/helpers";

const Catagories = (props) => {
  const { token } = props;
  const [categories, setCatagory] = useState('');
  const [availible, setAvailible] = useState(true);
  const [name, setName] = useState("");
  const [description, setDesciption] = useState("");
  const [price, setPrice] = useState(0);
  const [quanity, setQuanity] = useState(5);


  useEffect(() => {
    getAllCategorys()
    .then((categories) => {
        setCatagory(categories);
    })
    .catch((e) => {
        console.error('Failed to get catagory')
    });
}, [ setCatagory ])

console.log(categories)

  const productSubmit = async (e) => {
    e.preventDefault();
    try{
      // Something similar to this. Set token in local storage and go back to main page:

      // const result = await REGISTER-HELPER-FUNCTION-HERE
      // if(result.success) {
      //   localStorage.setItem({TOKEN_STORAGE_KEY}, result.token);
      //   navigate("/")
        console.log("This is a filler to prevent errors. Delete later")
      } catch (e) {
        console.error(e);
        throw e;
      }finally {
 
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
      { categories.map((category) => {
        return (
          <div>
            <h2>{ category.name }</h2>
          </div>
        )
      })}
    </>
  )
}

export default Catagories;