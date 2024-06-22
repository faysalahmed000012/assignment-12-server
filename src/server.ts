import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.mongo_uri as string);

    server = app.listen(config.port, () => {
      console.log(`Server is Runnning on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", (error) => {
  console.log(`😈 Unhandled Rejection is detected, shutting down ...`, error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 Uncaught Exception is detected, shutting down...`);
  process.exit(1);
});
