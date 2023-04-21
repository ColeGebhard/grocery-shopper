export const isUser = async (token) => {
  try {
      const resp = await fetch(`/api/users/me`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
      });
      const data = await resp.json();
      if (data.username) {
          return {
              id: data.id,
              username: data.username,
          };
      }
      return false;
  } catch (error) {
      console.error(error);
  }
};

// export const checkUsername = async(username) => {
//   try {
//     const resp = await fetch(`/api/users/${username}`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     const data = await resp.json();
 
//     return data;
// } catch (error) {
//     console.error(error);
// }
// }

export async function fetchRegisterResults(username, password, firstName, lastName, email) {
  try {
    const response = await fetch("/api/users/register", {
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
    const response = await fetch("/api/users/login", {
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
    const response = await fetch("/api/category", {
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

export async function createCategory({name, photos}) {
  try {
    const response = await fetch("/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        photos
      })
    });
    console.log(response)

    const data = await response.json();

    console.log('FIND', data)


    return data
  } catch (error) {
    throw Error(error);
  }
}

export async function getAllProducts() {
  try {
    const response = await fetch("/api/category/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Cannot get products');
  }
}


export async function getSingleProduct(id) {
  try {
    const response = await fetch(`/api/category/${id}`, {
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

export async function getSingleCategory(name) {
  try {
    const response = await fetch(`/api/category/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();

    console.log(name)
    
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
  quantity,
  categoryId
}) {
  try {
    const response = await fetch(`/api/category/${categoryId}/products`, {
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
        quantity,
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
    const response = await fetch("/api/carts", {
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
    const response = await fetch("/api/carts/items", {
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

      const resp = await fetch(`/api/carts/${userId}`, {
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
    const response = await fetch(`/api/carts/${cartId}`);
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
    const response = await fetch(`/api/carts/${cartId}/items`, {
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

export async function clearCartItems(
  cartId,
) {
  try {
    const response = await fetch(`/api/carts/${cartId}/items`, {
      method: "DELETE"
    });
    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    throw Error(error);
  }
}

export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`/api/category/product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
        }
    });

    const data = await response.json()

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`/api/category/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
        }
    });

    const data = await response.json()

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};