/** @format */

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbconn = require("./config/dbconn");
const initRoute = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initRoute(app);

dbconn();

const port = process.env.PORT || 8888;

app.listen(port, () => console.log(port));
