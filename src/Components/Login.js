import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { fetchLoginResults } from "../api/helpers";
import './Login.css'


const Login = (props) => {
  const { token, setToken, username, setUsername, password, setPassword } = props;
  
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try{
      const result = await fetchLoginResults(username, password)
      if(result.data.success) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.setItem(TOKEN_STORAGE_KEY, result.data.token)
        setToken(result.data.token)
        window.alert(`Hello ${username}!`)
        window.location.href = ('/')
        // window.location.reload();
      } else if (!result.data.success) {
        setUsername("");
        setPassword("");

        window.alert('Invalid Login Credentials')
        // LOGIN NOT COMPLETE. UNDEFINED ERROR IF NO USER IS REGISTERED
        // The following lines show the error message to the user
        // const addP = document.createElement("p");
        // const errorContainer = document.getElementById("errorContainer");
        // while (errorContainer.firstChild) {
        //   errorContainer.removeChild(errorContainer.firstChild);
        // };
        // const newContent = document.createTextNode(result.data.message)
        // addP.appendChild(newContent);
        // errorContainer.appendChild(addP);
      }
    } catch (e) {
        throw e;
      } 
  }


  return (
    <>
      <form id="loginForm" onSubmit={loginSubmit}>
      <div>
          <label className="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="john123"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="password">Password:&nbsp;&nbsp;
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={toggleShowPassword}
          /></label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log in!</button>
        <button onClick={() => {navigate("/register")}}>New? Sign Up</button>

      </form>
    </>
  )
}

export default Login;