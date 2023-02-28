import React from "react";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "..";


const Register = (props) => {
  const { username, setUsername, token, setToken, password, setPassword } = props;

  const registerSubmit = async (e) => {
    e.preventDefault();
    try{
      // Something similar to this:

      // const result = await REGISTER-HELPER-FUNCTION-HERE
      // if(result.success) {
      //   localStorage.setItem({TOKEN_STORAGE_KEY}, result.token);
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
      <form id="registerForm" onSubmit={registerSubmit}>
        {/* Create the register handler function */}
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
        <button type="submit">Sign up!</button>
      </form>
    </>
  )

};

export default Register;
