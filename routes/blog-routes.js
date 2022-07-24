//Import express package
import express from "express";

//Imported controller functions
import { getAllBolgs, addBlog, updateBlog, getBlogByid, deleteBlogById, userBlogs } from '../controllers/blog-controller';

//Create a refernace for express router
const blogRouter = express.Router();

//Creat routes and pass cotroller funstion as handlears 
blogRouter.get("/", getAllBolgs);

blogRouter.post("/add", addBlog);

blogRouter.put("/update/:id", updateBlog);

blogRouter.get("/blog/:id", getBlogByid);

blogRouter.delete("/delete/:id", deleteBlogById);

blogRouter.get("/user/blogs/:id", userBlogs);

//export router so we can user where we want
export default blogRouter;