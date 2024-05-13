import express from "express";
import routes from "./src/routes/index.js";
import { connect } from "mongoose";

const app = express();
const port = 3000;

try {
  await connect("mongodb://127.0.0.1:27017/demo-nodeJs");
  console.log("Database connected");
} catch (error) {
  console.log(error);
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
