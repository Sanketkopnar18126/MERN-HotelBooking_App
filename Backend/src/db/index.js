import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const ConnectDb = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    // console.log("connection Instance:", ConnectionInstance);
    console.log(
      `\nMongo Successfully connected to MongoDb.....!:${ConnectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("error occur to connect Db....!", error);
  }
};

export default ConnectDb;
