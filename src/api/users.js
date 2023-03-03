const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { createUser, getUserByUsername } = require("../db");

usersRouter.get('/health', async (req, res, next) => {
  res.send({message: "All is well."});
  next();
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, email } = req.body;

    const queriedUser = await getUserByUsername(username);
    
    if (queriedUser) {
      res.status(401);
      next(
        `User Exists Error: Username ${queriedUser.username} is already taken.`
      );
    } else if (password.length < 8) {
      res.status(401);
      next(
        `Password Length Error: This password is too short. A longer password is required.` 
      );
    } else {
      const user = await createUser({
        username, password, firstName, lastName, email
      });
      if (!user) {
        next(
          `Registration Error: We encountered a problem registering your account. Please try again`
        );
      } else {
        jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          {expiresIn: "1w" }
        );
        res.json(`${username}, you have successfully registered!`);
      }
    }
  } catch (e) {
    next(e);
  }
})

module.exports = usersRouter