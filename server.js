const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

// router
const account = require("./router/account");

server.use("/api/accounts", account);

server.get("/", (req, res) => {
  return res.send("Welcome to the API");
});

server.use((error, res, req, next) => {
  console.log(error);
  //   return res.status(500).json({ error: "something is not right" });
});

module.exports = server;
