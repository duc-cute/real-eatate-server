/** @format */

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbconn = require("./config/dbconn");
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbconn();

const port = process.env.PORT || 8888;

app.listen(port, () => console.log(port));
