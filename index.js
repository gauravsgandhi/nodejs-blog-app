//import express module for creating http server
import express from "express";
//mongoose for working with db
import mongoose from "mongoose";

//imported defined routes
import router from "./routes/user-routes";
import blogRouter from './routes/blog-routes';

// config.js
import dotenv from "dotenv";
dotenv.config();

//intalize express app
const app = express();

//define middleware application is going to accept json format
app.use(express.json());

//Routes are asssigned to application
app.use("/api/user", router);

app.use("/api/blog", blogRouter);

app.use((req , res)=>{
    res.status(404).send("<h3>404 page Node Found</h3");      
});

//console.log(process.env.MONGO_CONNECTION_URL);

//Datbase Connection //listen the port in application
mongoose
  .connect(
    process.env.MONGO_CONNECTION_URL
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("Connected to Database and listing to PORT number 5000")
  )
  .catch((err) => console.error(err));


