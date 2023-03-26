require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require('path')
const cors = require("cors");
const app = express();
const apiRouter = require('./src/api')
const bodyParser = require('body-parser')

const client = require("./src/db/client");

const buildPath = path.join(__dirname, 'build')

client.connect();

app.use(express.static(buildPath));
app.use(cors());
app.use(bodyParser.json())
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})

app.use((req, res) => {
  res.status(404).send("Not found");
});

module.exports = app;