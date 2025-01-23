import express from "express";
import dotenv from "dotenv";
import connectToMongo from "./db/db.js";

import cors from "cors";

import gobalErrorHandler from "./Controllers/error.controllers.js";

import KrumRoutes from "./Routes/Krums.js";
import UserRoutes from "./Routes/Usersroute.js"
import KrumModelRoutes from "./Routes/KrumModel.js"

dotenv.config();
const app = express();
connectToMongo();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use("/api/krums", KrumRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/krummodels", KrumModelRoutes);


app.use(gobalErrorHandler)

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});