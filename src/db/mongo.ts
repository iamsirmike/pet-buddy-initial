import mongoose from "mongoose";

const MONGO_URL: string = "mongodb+srv://iamsirmike:UEsO1gfN7cJqjP96@pet-buddy.u60gwth.mongodb.net/pet-buddy-db?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("Mongo connection is ready!");
});

mongoose.connection.on("err", () => {
  console.error("Mongo connection error!");
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

export default {
  mongoConnect,
  mongoDisconnect,
};
