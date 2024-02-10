const express = require("express")
const router = express.Router()
const AuthorController = require("../controllers/AuthorController")
const AuthConroller = require("../controllers/AuthConroller")

router.route("/").get(AuthorController.getAllAuthors).post(AuthConroller.AuthenticateAdmin,AuthorController.addAuthor)
router.route("/:id").get(AuthorController.getAuthorById).put(AuthConroller.AuthenticateAdmin,AuthorController.editAuthor).delete(AuthConroller.AuthenticateAdmin,AuthorController.deleteAuthorById)
router.route("/SearchAuthor/:AuthorName").get(AuthorController.getAuthorByName)





module.exports=router