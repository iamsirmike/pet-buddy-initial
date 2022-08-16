//Create our server using http and pass app to it.
//App is coming from app.js which is our express app.
//We now use express as a middleware to handle our requests.

import { createServer, Server } from "http";


import app from "./app";
import {MongoConnect} from "./src/db/mongo";

const PORT = process.env.PORT;

const server: Server = createServer(app);

async function startServer() {
  await MongoConnect.mongoConnect();

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
}

startServer();
