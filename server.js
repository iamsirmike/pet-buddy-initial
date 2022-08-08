//Create our server using http and pass app to it.
//App is coming from app.js which is our express app.
//We now use express as a middleware to handle our requests.

import { createServer } from "http";


import app from "./app.js";
import mongo from "./src/services/mongo.js";

const PORT = process.env.PORT;

const server = createServer(app);

async function startServer() {
  await mongo.mongoConnect();

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
}

startServer();
