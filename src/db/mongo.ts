import mongoose from "mongoose";

export class MongoConnect{
 static openMongoConnection = mongoose.connection.once("open", () => {
    console.log("Mongo connection is ready!");
  });
  
 static mongoErr =  mongoose.connection.on("err", () => {
    console.error("Mongo connection error!");
  });
  
  static mongoConnect = async()=> {
    const MONGO_URL: string = process.env.MONGO_URL || "4000";
    await mongoose.connect(MONGO_URL);
  }
  
 static mongoDisconnect = async()=> {
    await mongoose.disconnect();
  }
}
