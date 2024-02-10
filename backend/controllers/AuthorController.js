
const AuthorService=require('../services/AuthorService');

const getAllAuthors=async(req,res)=>{
   try{
        const result=await AuthorService.getAllAuthors();
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}
const getAuthorById=async(req,res)=>{
    try{
        const result=await AuthorService.getAuthorByID(req.params.id);
        const nbr=await AuthorService.getAuthorNbrBooks(req.params.id);

        res.status(200).json({result,nbr})
   }
   catch(error){
    res.status(500).json(error)

   }
}
const getAuthorByName=async(req,res)=>{
    try{
        const result=await AuthorService.getAuthorByName(req.params.AuthorName);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}

const deleteAuthorById=async(req,res)=>{
    try{
        const result=await AuthorService.DeleteAuthor(req.params.id);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}

const addAuthor=async(req,res)=>{
    try{
        const result=await AuthorService.AddAuthor(req.body);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}
const editAuthor=async(req,res)=>{
    try{
        const result=await AuthorService.EditAuthor(req.params.id,req.body);
        res.status(200).json(result)
   }
   catch(error){
    res.status(500).json(error)

   }
}


module.exports={
    getAllAuthors,getAuthorById,deleteAuthorById,addAuthor,editAuthor,getAuthorByName
}