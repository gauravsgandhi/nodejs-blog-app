//Imported blog module schema
import Blog from "../model/Blog";

//export function for get all blogs
export const getAllBolgs = async(req,res,next) => {

    let blogs;

    try{
        blogs = await Blog.find().populate("user");
    }catch(err){
        return console.log(err);
    }

    if(!blogs){
        return res.status(404).json({message:"No Blogs Found"});
    }

    return res.status(200).json({blogs});
}

//export function for add blogs
export const addBlog  = async(req,res,next) =>{

       const {title,description,image,user} = req.body;

       const blog = new Blog({
         title,
         description,
         image,
         user
       });

       try{
           blog.save();
       }catch(err){
          return console.log(err);
       }

       return res.status(200).json({blog})
}

//export function for update blogs
export const updateBlog = async (req,res,next) =>{

       const {title, description} = req.body;

       const blogId = req.params.id;

       let blog;

       try{
           blog = await Blog.findByIdAndUpdate(blogId,{title,description});
       }catch(err){
        return console.log(err);
       }

       if(!blog){
          return res.status(500).json({message:"Unable to update thr blog"});
       }

       return res.status(200).json({blog})

}


//export function for get blog by id
export const getBlogByid = async (req,res,next) =>{

        const id = req.params.id;

        let blog;

        try{
            blog = await Blog.findById(id);
        }catch(err){
            return console.log(err);
        }

        if(!blog){
            return res.status(400).json({message:"No Blogs found"});
        }

        res.status(200).json({blog});
}    


//export function for delete blog by id
export const deleteBlogById = async (req,res,next) =>{
      
    let blog;
    try {
      blog = await Blog.findByIdAndRemove(id)
    } catch (err) {
      console.log(err);
    }
    if (!blog) {
      return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Delete" });
}


//export function for find blog by user
export const userBlogs = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
      userBlogs = await User.findById(userId)
    } catch (err) {
      return console.log(err);
    }
    if (!userBlogs) {
      return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ user: userBlogs });
  };