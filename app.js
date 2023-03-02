require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
// const apiRouter = require("./api"); --> for later

const client = require("./src/db/client");
client.connect();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// 404 handler
// app.use("/api", apiRouter);

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

app.listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});

module.exports = app;