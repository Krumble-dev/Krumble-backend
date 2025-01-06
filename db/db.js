import mongoose from "mongoose";
import dotenv from "dotenv";

import { DB_NAME } from "../constants.js";

dotenv.config();

const mongoURI = `mongodb://localhost:27017/${DB_NAME}`;

const connectToMongo = () => {
  // console.log("Connecting to MongoDB", mongoURI);
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB");
      console.log(error.message);
    });
};

export default connectToMongo;
