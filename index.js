/** @format */

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", (req, res) => res.send("Server on 5000"));

const port = process.env.PORT || 8888;

app.listen(port, () => console.log(port));
