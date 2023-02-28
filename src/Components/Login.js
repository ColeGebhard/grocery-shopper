import React from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "..";


const Login = (props) => {
  const { token, setToken, username, setUsername, password, setPassword } = props;

  const navigate = useNavigate();

  const loginSubmit = async (e) => {
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
      } finally {
        setUsername("");
        setPassword("");
      }
  }


  return (
    <>
      <form id="loginForm" onSubmit={loginSubmit}>
        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in!</button>
      </form>
    </>
  )
}

export default Login;