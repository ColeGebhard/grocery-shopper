require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const apiRouter = require('./src/api')
const bodyParser = require('body-parser')

const client = require("./src/db/client");
client.connect();

app.use(cors());
app.use(bodyParser.json())
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", apiRouter);

app.get('/message', (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");
  next();
});

app.use((req, res) => {
  res.status(404).send("Not found");
});

module.exports = app;