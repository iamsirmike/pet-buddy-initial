//Create our server using http and pass app to it.
//App is coming from app.js which is our express app.
//We now use express as a middleware to handle our requests.

const http = require("http");
require("dotenv").config();

const app = require("./app");
const { mongoConnect } = require("./src/services/mongo");

const PORT = process.env.PORT;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
}

startServer();
