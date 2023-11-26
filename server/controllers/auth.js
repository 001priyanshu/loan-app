const User = require('../models/user');

exports.registerUser = async (req,res,next) =>{
 
      try{
        const {name,email,password,isAdmin} = req.body;
        const user = await User.findOne({email : email, isAdmin : isAdmin});
        if(user){
            return res.status(400).json({
                message: "User with that email already exists!"
            })
        }
        await User.create({email : email, isAdmin : isAdmin,password : password,name : name});
        return res.status(200).json({
            message : "success"
        })
      }
      catch(err){
         return res.status(500).json({
            message : "Internal server Error"
         })
      }
}

exports.loginUser = async (req, res, next) => {
    try {
      const {email,password,isAdmin} = req.body;
  
      const user = await User.findOne({ email: email, isAdmin: isAdmin });
  
      if (!user) {
        return res.status(400).json({
          message: "user does not exist",
        });
      }
  
      if (password !== user.password) {
        return res.status(400).json({
          message: "please enter the correct password",
        });
      }
  
      return res.status(200).json({
        message: "success",
        user: user,
      });
    } catch(err) {
        return res.status(500).json({
            message : "Internal server Error"
         })
    }
  };
