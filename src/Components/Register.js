import React from "react";
import { useState } from "react";
import { TOKEN_STORAGE_KEY } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { fetchRegisterResults } from "../api/helpers";
import "../index.css"
import { useNavigate } from "react-router-dom";
// import { getUserByUsername } from "../db";



const Register = (props) => {
  const { username, setUsername, setToken, password, setPassword, email, setEmail, firstName, setFirstName, lastName, setLastName } = props;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const registerSubmit = async (e) => {
    e.preventDefault();


    // if (password !== confirmPassword) {
    //   window.alert("Passwords do not match");
    //   return;
    // }

    // if (password < 8) {
    //   window.alert('Password is too short')
    //   return
    // }

    try {
      const result = await fetchRegisterResults(username, password, firstName, lastName, email)
      if (!result.data.success) {
        window.alert(result.error)
      }

      if (result.data.success) {
        localStorage.setItem(TOKEN_STORAGE_KEY, result.data.token);
        console.log("Officially registered");
        setToken(result.data.token);
        window.alert(`Hello ${username}!`)
        window.location.href = ('/')
        setFirstName('')
        setLastName('')
        setEmail('')

        // Hide form and show completion message with button to navigate to home page
        // const registrationForm = document.getElementById("registerForm");
        // const completionMessage = document.getElementById("completionMessage")
        // registrationForm.classList.add("noDisplay");
        // completionMessage.classList.remove("noDisplay");
      }
    } catch (e) {
      throw e;
    } finally {
      // setUsername("");
      // setPassword("");
      // setConfirmPassword("")
      // setFirstName('')
      // setLastName('')
      // setEmail('')
    }
  }

  return (
    <>
      <form id="loginForm" onSubmit={registerSubmit}>
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
        <div>
          <label className="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            placeholder="John"
            value={firstName || ""}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            placeholder="Smith"
            value={lastName || ""}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label className="email">Email Address:</label>
          <input
            type="text"
            id="email"
            placeholder="john@domain.com"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Sign up!</button>
      </form>


      <div id="completionMessage" className="noDisplay">
        Congrats! You registered! Here is a button that takes you to the home page, add functionality later
        <button
          onClick={(e) => {
            navigate("/")
          }}
        >
          Home
        </button>
        <button
          onClick={(e) => {
            navigate("/login")
          }}
        > Login. This button is for testing. Delete before deployment.
        </button>
      </div>
    </>
  )

};

export default Register;
