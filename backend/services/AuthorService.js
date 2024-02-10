const Author=require('../models/Author');


const getAllAuthors=async()=>{
    return await Author.find();
}
const getAuthorByID=async(id)=>{
    return await Author.findById(id);
}

const getAuthorByName=async(name)=>{
    return await Author.find({ name: { $regex: name, '$options' : 'i' }}).select('_id name Country').limit(3);
}
const getAuthorNbrBooks=async(id)=>{
    return await Author.findById(id).count();
}
const AddAuthor=async(author)=>{
    return await Author.create(author);
}

const EditAuthor=async(p,author)=>{
    return await Author.findByIdAndUpdate(p,author).exec()
}

const DeleteAuthor=async(id)=>{
    return await Author.deleteOne({_id:id});
}


module.exports={getAuthorNbrBooks,getAllAuthors ,getAuthorByID,AddAuthor,EditAuthor,DeleteAuthor,getAuthorByName}