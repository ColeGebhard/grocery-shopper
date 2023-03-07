import React from "react";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "..";
import { fetchRegisterResults } from "../api/helpers";
import "../index.css"



const Register = (props) => {
  const { username, setUsername, token, setToken, password, setPassword, email, setEmail, firstName, setFirstName, lastName, setLastName } = props;


  const registerSubmit = async (e) => {
    e.preventDefault();
    try{
      const result = await fetchRegisterResults(username, password, firstName, lastName, email)
      if(result.data.success) {
        localStorage.setItem(TOKEN_STORAGE_KEY, result.data.token);
        console.log("Officially registered");
        setToken(result.data.token);

        // Hide form and show completion message with button to navigate to home page
        const registrationForm = document.getElementById("registerForm");
        const completionMessage = document.getElementById("completionMessage")
        registrationForm.classList.add("noDisplay");
        completionMessage.classList.remove("noDisplay");
      } 
      } catch (e) {
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

      <div id="completionMessage" className="noDisplay">
        Congrats! You registered! Here is a button that takes you to the home page, add functionality later
        <button>
          Home
        </button>
      </div>
    </>
  )

};

export default Register;
