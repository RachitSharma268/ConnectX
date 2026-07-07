import express from "express";

import ".../env";

import { connectToSocket } from "./controller/socketManager.js";

import { createServer } from "node:http";

import cors from "cors";

import mongoose from "mongoose";

const port = 3030;

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

const dbUrl = process.env.ATLASDB_URL;

app.use(cors());

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.get("/home", (req, res) => {
  res.send("Home page");
});

async function main() {
  try {
    const connectionDb = await mongoose.connect(dbUrl);
    console.log(`Mongo Connected DB Host : ${connectionDb.connection.host}`);
  } catch (err) {
    console.error(err);
  }
}

main();

server.listen(port, () => {
  console.log(`YOU ARE ON PORT ${port}`);
});
