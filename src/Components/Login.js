import React from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "..";
import { fetchLoginResults } from "../api/helpers";


const Login = (props) => {
  const { token, setToken, username, setUsername, password, setPassword } = props;

  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    try{
      const result = await fetchLoginResults(username, password)
      if(result.data.success) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.setItem(TOKEN_STORAGE_KEY, result.data.token)
        setToken(result.data.token)
        navigate("/")
      } else if (!result.data.success) {
        setUsername("");
        setPassword("");
        // LOGIN NOT COMPLETE. UNDEFINED ERROR IF NO USER IS REGISTERED
        // The following lines show the error message to the user
        const addP = document.createElement("p");
        const errorContainer = document.getElementById("errorContainer");
        while (errorContainer.firstChild) {
          errorContainer.removeChild(errorContainer.firstChild);
        };
        const newContent = document.createTextNode(result.data.message)
        addP.appendChild(newContent);
        errorContainer.appendChild(addP);
      }
    } catch (e) {
        throw e;
      } 
  }


  return (
    <>
      <form id="loginForm" onSubmit={loginSubmit}>
        <input 
          type="text"
          placeholder="Username"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in!</button>
      </form>
      <div id="errorContainer">

      </div>
    </>
  )
}

export default Login;