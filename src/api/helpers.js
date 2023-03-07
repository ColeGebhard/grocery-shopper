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
