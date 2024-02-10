const mongoose=require("mongoose");
const Book = require("./Book");
const Author = require("./Author");

const UserSchema=new mongoose.Schema({
    lName:String,
    fName:String,
    email:{
        type: String,
        unique:true
    },
    password:String,
    BookLibrary:[{
               type:mongoose.Types.ObjectId,
               ref:"Book"
         }],
   /* AuthorFollowed:[{
            type:mongoose.Types.ObjectId,
            ref:"Author"
      }],*/
    roles:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    RatedBooks:[{
        type:mongoose.Types.ObjectId,
        ref:"Book"
    }]

    
})



UserSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    const user = await this.model.findOne(this.getFilter());
   await Book.updateMany(
        { $pull: { review: {user:user._id}} })  
    .exec();
    next();  });


const User=mongoose.model("User",UserSchema)
module.exports=User