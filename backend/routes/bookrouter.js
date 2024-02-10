const express = require("express")
const router = express.Router()
const BookController = require("../controllers/BookController")
const AuthConroller = require("../controllers/AuthConroller")

router.route("/").get(BookController.getAllBooks).post(AuthConroller.AuthenticateAdmin,BookController.addBook)
router.route("/MostRated").get(BookController.getRatedBooks)
router.route("/Book/:id").get(BookController.getBookById).put(AuthConroller.AuthenticateAdmin,BookController.editBook).delete(AuthConroller.AuthenticateAdmin,BookController.deleteBookById)
router.route("/BookUrl/:id").get(BookController.getBookURLById)
router.route("/Author").get(BookController.getBookByAuthorId)
router.route("/Genre/:genre").get(BookController.getAllBooksByGenre)
router.route("/AddVisit/:id").get(AuthConroller.AuthenticateToken,BookController.addBookVisits)
router.route("/AddReview/:id").post(AuthConroller.AuthenticateToken,BookController.addBookReview)
router.route("/AddScore/:BookId").post(AuthConroller.AuthenticateToken,BookController.addScore)
router.route("/SearchBook/:BookName").get(BookController.getAllBooksByName)




module.exports=router