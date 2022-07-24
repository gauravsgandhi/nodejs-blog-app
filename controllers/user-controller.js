import User from "../model/User";
import bcrypt from "bcryptjs";

//asyns = There’s a special syntax to work with promises in a more comfortable fashion, 
//called “async/await”. It’s surprisingly easy to understand and use.

export const getAllUser = async (req, res, next) => {
    let users;
    try {
      users = await User.find();
    } catch (err) {
      console.log(err);
    }
    if (!users) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ users });
  };

  export const singnup = async (req, res , next) =>{
        
      const {name, email, password } = req.body;
       
      let exectingUser;

      try{          
        exectingUser = await User.findOne({email});
      }catch(err){
          return console.log(err);
      }

      if(exectingUser){
        return res.status(400).json({message:"User all reday exists! Login insted"});
      }

      const hashPassword = bcrypt.hashSync(password);
      
      const user = new User({
          name,
          email,
          password:hashPassword
      });

      try{
        user.save();
      }catch(err){
        return console.error(err);
      }

      return res.status(201).json({user});  
  }


  export const login = async (req, res, next) =>{
      
      const {email, password } = req.body;

      let exectingUser;

      try{
         
        exectingUser = await User.findOne({email});

      }catch(err){
        return console.log(err);
      }
      
      if(!exectingUser){
         return res.status(400).json({message:"No user found by this email"});
      } 

      const isPasswordCorrect = bcrypt.compareSync(password,exectingUser.password);

      if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect password"});
      }

      return res.status(200).json({message:"Login Sucesfully", user:exectingUser});


  }  
  