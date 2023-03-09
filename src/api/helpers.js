import { USER_STORAGE_KEY } from "..";


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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        description,
        price,
        photos,
        quanity,
        categoryId: 1
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
        "Content-Type:": "application/json"
      }
    });
    const data = await response.json();

    return data;
  } catch (e) {
    throw e;
  }
}
