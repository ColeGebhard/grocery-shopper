import { USER_STORAGE_KEY } from "..";

export async function fetchRegisterResults(username, password, fullName, email) {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        username: username,
        password: password,
        fullName: fullName,
        email: email
      }),
    }
    );
    const results = await response.json();
    if (results.token) {
      localStorage.setItem(USER_STORAGE_KEY, results.token);
      return localStorage.getItem(USER_STORAGE_KEY);
    }
    alert(password);
  } catch (e) {
    throw e;
  }
}