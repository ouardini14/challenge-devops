const mongoose=require("mongoose");
const Book = require("./Book");
const User = require("./User");

const AuthorSchema=new mongoose.Schema({
    name:String,
    Country:String,    
    Description:String,    

})




AuthorSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    const author = await this.model.findOne(this.getFilter());
    await Book.deleteMany({author:author._id})  .exec(); //if reference exists in multiple documents 
  /*  await User.updateMany(
        { $pull: { AuthorFollowed:author._id} })  .exec(); */
       next();  });



const Author=mongoose.model("Author",AuthorSchema)
module.exports=Author