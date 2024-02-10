const UserService = require("../services/User/UserService");
const AuthService = require("../services/User/AuthService");
const AdminService = require("../services/User/AdminService");

const addUser = async (req, res) => {
  try {
    const result = await AuthService.createUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const editUser = async (req, res) => {
  if(req.user._id==req.params.id || req.user.roles=="admin")
 { try {
    const user=req.body
    if(req.user.roles!="admin"){    user.roles="user"}
   const result = await UserService.editUser(req.params.id,user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }}
  else return res.sendStatus(403)
};

const getUserById = async (req, res) => {
  if(req.user._id==req.params.id || req.user.roles=="admin")
 { try {
    const result = await UserService.getUserById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }}
  else return res.sendStatus(403)
};

const deleteUserById=async(req,res)=>{
  try{
      const result=await UserService.DeleteUser(req.params.id);
      res.status(200).json(result)
 }
 catch(error){
  res.status(500).json(error)

 }
}

const addAdmin= async (req, res) => {
  try {
    const result = await AuthService.createAdmin(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(409).json(error);
  }
};


const getUsers = async (req, res) => {
  try {
    const result = await UserService.getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAdmins = async (req, res) => {
  try {
    const result = await AdminService.getAllAdmins();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getLibraryBooks = async (req, res) => {
  try {    

   const result = await UserService.getBooks(req.user._id,req.query);

    res.status(200).json(result.BookLibrary);
  } catch (error) {

    res.status(500).json(error);
  }
};

const getLibraryBooksId = async (req, res) => {
  try {    

   const result = await UserService.getBooksId(req.user._id);
    res.status(200).json(result);
  } catch (error) {

    res.status(500).json(error);
  }
};

const addLibraryBooks = async (req, res) => {
  try {
  const result = await UserService.addBookToLibrary(req.user._id, req.body.BookId);
 res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const RemoveLibraryBooks = async (req, res) => {
  try {
  const result = await UserService.removeBookFromoLibrary(req.user._id, req.body.BookId);
 res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = {getLibraryBooksId, deleteUserById,getAdmins,addLibraryBooks, addAdmin,addUser, getUserById,getUsers, editUser,getLibraryBooks ,RemoveLibraryBooks };
