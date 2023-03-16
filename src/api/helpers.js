import { USER_STORAGE_KEY } from "..";

export const isUser = async (token) => {

  try {

      const resp = await fetch(`http://localhost:8000/api/users/me`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
      });

      const data = await resp.json();
      if(data.username){
      return data
      }
      return false
  } catch (error) {
      console.error(error)
  }
}

export async function fetchRegisterResults(username, password, firstName, lastName, email) {
  try {
    const response = await fetch("http://localhost:8000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email
      })
    }
    ).then(result => result.json());
    console.log(response);

    return response
  } catch (e) {
    throw e;
  }
}

export async function fetchLoginResults(username, password) {
  try {
    const response = await fetch("http://localhost:8000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }
    ).then(result => result.json());
    console.log(response);

    return response
  } catch (e) {
    throw e;
  }
}

export async function getAllCategories() {
  try {
    const response = await fetch("http://localhost:8000/api/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();


    return data
  } catch (error) {
    throw Error(error);
  }
}

export async function createCategory(name) {
  try {
    const response = await fetch("http://localhost:8000/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name
      })
    });
    const data = await response.json();


    return data
  } catch (error) {
    throw Error(error);
  }
}

export async function getAllProducts() {
  try {
    const response = await fetch("http://localhost:8000/api/category/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();


    return data
  } catch (error) {
    throw Error(error);
  }
}

export async function getSingleProduct(id) {
  try {
    const response = await fetch(`http://localhost:8000/api/category/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();


    return data
  } catch (error) {
    console.error('Cannot get product')
    throw Error(error);
  }
}


export async function createProducts({
  name,
  description,
  price,
  photos,
  quanity,
  categoryId
}) {
  try {
    const response = await fetch(`http://localhost:8000/api/category/${categoryId}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Content-type": "image"
      },
      body: JSON.stringify({
        name,
        description,
        price,
        photos,
        quanity,
        categoryId
      })
    });
    const data = await response.json();

    console.log(data)

    return data
  } catch (error) {
    throw Error(error);
  }
}

export async function getAllCarts() {
  try {
    const response = await fetch("http://localhost:8000/api/carts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();

    return data
  } catch (error) {
    throw Error(error);
  }
}

export async function getAllCartItems() {
  try {
    const response = await fetch("http://localhost:8000/api/carts/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();

    return data
  } catch (error) {
    throw Error(error);
  }
}

export const createCart = async (userId) => {

  try {

      const resp = await fetch(`http://localhost:8000/api/carts/${userId}`, {
        method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const data = await resp.json();

      console.log(data)

      return data
  } catch (error) {
      console.error(error)
  }
}

export const getCart = async (cartId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/carts/${cartId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createCartItem({
  cartId,
  productId,
  quantity,
}) {
  try {
    const response = await fetch(`http://localhost:8000/api/carts/${cartId}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity,
      })
    });
    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    throw Error(error);
  }
}
