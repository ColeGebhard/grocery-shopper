const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { createUser, getUserByUsername, getUser } = require("../db");

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
      next({
        success: false,
        token: null,
        user: {},
        message: `User Exists: Username ${queriedUser.username} is already taken.`

      }
      )
    } else if (password.length < 8) {
        res.status(401);
        next({
          success: false,
          token: null,
          user: {},
          message: `This password is too short. A longer password is required.` 

        }
      )
    } else {
      const user = await createUser({
        username, password, firstName, lastName, email
      });
      if (!user) {
        res.status(401);
        next({
          success: false,
          token: null,
          user: {},
          message: `We encountered a problem registering your account. Please try again`

        }
        );
      } else {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          {expiresIn: "1w" }
        ); 
        res.json({data: {
          success: true,
          token: token,
          user: {
            id: user.id,
            username: username
          },
          message: `Congratulations, ${username}, you have successfully registered!`

        }});
      }
    }
  } catch (e) {
    next(e);
  }
})

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      success: false,
      token: null,
      user: {},
      message: `Missing credentials. Please supply both a username and a password.` 

    });
  }
  try {
    const user = await getUser({ username, password });
    if (!user) {
      next({
        success: false,
        token: null,
        user: {},
        message: `Username or password is incorrect. Please try again` 
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.json({data: {
        success: true,
        token: token,
        user: {
          id: user.id,
          username: user.username
        },
        message: `You're logged in!` 
      }})
    }
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter