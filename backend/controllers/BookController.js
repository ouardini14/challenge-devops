
const BooksService=require('../services/BooksService');

const getAllBooks=async(req,res)=>{

  try{
       const result=await BooksService.getAllBooks(req.query);
        res.status(200).json(result)
        
    
   }
   catch(error){
    res.status(500).json(error)
   }
}
const getRatedBooks=async(req,res)=>{

    try{
         const result=await BooksService.getAllMostRatededBooks(req.query);
          res.status(200).json(result)
          
      
     }
     catch(error){
      res.status(500).json(error)
     }
  }
  
const getAllBooksByName=async(req,res)=>{
    try{
        const result=await BooksService.getBookByName(req.params.BookName);
         res.status(200).json(result)
    }
    catch(error){
     res.status(500).json(error)
 
    }
 }

const getBookById=async(req,res)=>{
    
    try{
        const result=await BooksService.getBookById(req.params.id);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}
const getBookURLById=async(req,res)=>{
    
    try{
        const result=await BooksService.getBookURLById(req.params.id);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}
const getBookByAuthorId=async(req,res)=>{
    try{
        const result=await BooksService.getAllBooksByAuthorId(req.query);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}




const getAllBooksByGenre=async(req,res)=>{
    try{
        const result=await BooksService.getAllBooksByGenre(req.params.genre);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}

const deleteBookById=async(req,res)=>{
    try{
        const result=await BooksService.deleteBookById(req.params.id);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}

const addBook=async(req,res)=>{
    try{
        const result=await BooksService.addBook(req.body);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}
const editBook=async(req,res)=>{


    try{
        const result=await BooksService.editBook(req.params.id,req.body);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}

const addBookReview=async(req,res)=>{
    try{
        const result=await BooksService.addBookReview(req.user._id,req.params.id,req.body);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}

const addBookVisits=async(req,res)=>{
    try{
        const result=await BooksService.addBookVisits(req.params.id);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}

const addScore=async(req,res)=>{
    try{
      const result=await BooksService.addScore(req.user._id,req.params.BookId,req.body.score);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}






module.exports={
    getRatedBooks,
    getBookURLById,
    getBookById,  
    getAllBooks,
    deleteBookById,
    addBook,
    getBookByAuthorId,
    getAllBooksByGenre,
    editBook,
    addBookReview,
    addBookVisits,addScore,getAllBooksByName
}