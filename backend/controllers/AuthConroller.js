const UserService=require('../services/User/UserService');
const AdminService=require('../services/User/AdminService');
const jwt=require("jsonwebtoken")

const AuthService=require('../services/User/AuthService');


const login=async(req,res)=>{
    try{ 

        const user=await AuthService.SignInUser(req.body)
        res.status(200).json(user)
    }catch(error){
      res.status(404).json(error.message)
    }

}

const UserInfo=async(req,res)=>{

  try{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return  res.status(200).json(null)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => { 
      const result = await UserService.getUserById(user.user._id);

      res.status(200).json(result)
    })
  }catch(error){
    res.status(200).json(null)
  }

}
const AuthenticateToken=async(req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { 

      if (err) return res.sendStatus(403)
      req.user = user.user
      next()
    })
  
}

const AuthenticateAdmin=async(req,res,next)=>{
  
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    if( user.user.roles=="admin") {
      req.user = user.user
      next()}
    else{
      return res.sendStatus(403)
    }
 
  })
}
const isAdmin=async(req,res,next)=>{
  
  return res.status(200)
}

module.exports={
    login,AuthenticateToken,AuthenticateAdmin,isAdmin,UserInfo
}