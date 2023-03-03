import React from "react";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "..";
import { fetchRegisterResults } from "../api/helpers";



const Register = (props) => {
  const { username, setUsername, token, setToken, password, setPassword, email, setEmail, firstName, setFirstName, lastName, setLastName } = props;


  const registerSubmit = async (e) => {
    e.preventDefault();
    try{
      const result = await fetchRegisterResults(username, password, firstName, lastName, email)
      // if(result.success) {
      //   localStorage.setItem({TOKEN_STORAGE_KEY}, result.token);
      //   console.log("Officially registered");
      //   console.log(token);
      // }
      console.log(result)
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
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="First name"
          value={firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName || ""}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email address"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Sign up!</button>
      </form>
    </>
  )

};

export default Register;
