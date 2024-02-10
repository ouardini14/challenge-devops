const express = require("express")
const router = express.Router()
const UserController = require("../controllers/UserController")
const AuthConroller = require("../controllers/AuthConroller")

router.route("/").get(UserController.getUsers).post(UserController.addUser)
router.route("/UserInfo").get(AuthConroller.UserInfo)
router.route("/Login").post(AuthConroller.login)
router.route("/Library").get(AuthConroller.AuthenticateToken,UserController.getLibraryBooks).post(AuthConroller.AuthenticateToken,UserController.addLibraryBooks).delete(AuthConroller.AuthenticateToken,UserController.RemoveLibraryBooks)
router.route("/LibraryIds").get(AuthConroller.AuthenticateToken,UserController.getLibraryBooksId)
router.route("/user/:id").delete(AuthConroller.AuthenticateAdmin,UserController.deleteUserById).get(AuthConroller.AuthenticateToken,UserController.getUserById).put(AuthConroller.AuthenticateToken,UserController.editUser)
router.route("/isAdmin").post(AuthConroller.AuthenticateAdmin,AuthConroller.isAdmin)
router.route("/Admin").get(AuthConroller.AuthenticateAdmin,UserController.getAdmins).post(AuthConroller.AuthenticateAdmin,UserController.addAdmin)

module.exports=router