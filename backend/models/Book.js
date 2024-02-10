const mongoose=require("mongoose");
const User = require("./User");

const BookSchema=new mongoose.Schema({
    name:String,
    Summary:String,
    url:String,
    CoverPic:String,
    rating:{
        type:Number,
        default:2,
    },
    score:[Number],
    genre:[String],
    language:String,
    author:{
        type:mongoose.Types.ObjectId,
        ref:"Author"
    },
    PublishDate:Date,
    review:[{
       user: {
          type:mongoose.Types.ObjectId,
          ref:"User"
        },
        ReviewText:String,
        ReviewDate:Date
    }],
    visits:{
        type:Number,
        default:0,
    },


    

})

/*
BookSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    const book = await this.model.findOne(this.getFilter());
   await User.updateMany(
        { $pull: { BookLibrary: book._id ,RatedBooks:book._id} })  
    .exec();
    next();  });*/

    BookSchema.post('updateOne', async function() {
        const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

      
        if (this._update['$push'].score || this._update['$pull'].score ) {
            const book = await this.model.findOne(this.getFilter());
            await Book.findByIdAndUpdate(book._id,{rating:Math.round(arrAvg(book.score))}).exec()
        }




    });

/*
BookSchema.pre('deleteMany', { document: false, query: true }, async function(next) {
        const book = await this.model.findOne(this.getFilter());
       await User.updateMany(
            { $pull: { BookLibrary: book._id} })  
        .exec();
        next();  });*/

const Book=mongoose.model("Book",BookSchema)

module.exports=Book