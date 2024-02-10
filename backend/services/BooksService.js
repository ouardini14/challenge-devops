const Book=require('../models/Book');
const User=require('../models/User');

const getAllBooks=async(args)=>{
   return await Book.find(args.genres ?{ genre: { $all: args.genres.split(',') }}:null ).sort({ [args.filter]: args.sort,"name":"desc"}).select(args.select).skip(args.start).limit(args.qt);
}
const getAllBooksByAuthorId=async(args)=>{
    return await Book.find({ author:args.id }).sort({ rating: 'desc'}).select('_id name CoverPic rating PublishDate').skip(args.start).limit(args.qt);
 }

 const getAllMostVisitedBooks=async()=>{
    return await Book.find().sort({ visits: 'desc'});
 }
 const getAllMostRatededBooks=async(args)=>{
    return await Book.find().sort({ rating: 'desc'}).populate({path:'author', select:'_id name'}).select(args.select).limit(args.qt);
 }
 const getAllBooksByGenre=async(Genre)=>{
    return await Book.find({ genre:Genre }).exec();
 }

const getBookById=async(id)=>{
    return await Book.findById(id).populate({path:'author', select:'_id name'}).populate({path:'review',populate: {
        path: 'user' , select:'_id fName lName'
    }});
}

const getBookURLById=async(id)=>{
    return await Book.findById(id).select("name url");
}
const getBookByName=async(name)=>{
    return await Book.find({ name: { $regex: name, '$options' : 'i' }}).populate({path:'author', select:'name'}).select('_id name PublishDate CoverPic rating').sort({PublishDate: 'desc'}).limit(3);
}

const deleteBookById=async(id)=>{
   
     await User.updateMany(
    { $pull: { BookLibrary: id ,RatedBooks:id} }).then(async ()=>{
        return await Book.deleteOne({_id:id});
    })
}

const addBook=async(p)=>{
    return await  Book.create(p)
}

const editBook=async(id,p)=>{
    return await  Book.findByIdAndUpdate(id,p).exec()
}

const addBookReview=async(userId,BookID,rev)=>{
   /* Book.exists({_id:BookID},async (error, result)=>{
        if (error){
           throw new Error("Not found !");      }
           else {
            User.exists({_id:userId},async (error, result)=>{
                if (result!=null){

                }

            })}})*/
    return await  Book.findByIdAndUpdate(BookID,{ $push:{ 'review':rev}}).exec()
}
const addBookVisits=async(id)=>{
    return await  Book.findByIdAndUpdate(id,{ $inc:{ 'visits':1}}).exec()
}


const addScore=async(userId,BookID,score)=>{
    Book.exists({_id:BookID},async (error, result)=>{
        if (error){
           throw new Error("Not found !");      }
           else {
            User.exists({_id:userId, RatedBooks: {"$in": [BookID]} },async (error, result)=>{
               if (result==null){
                   await  User.findByIdAndUpdate(userId, {
                        $push: { "RatedBooks": BookID }
                      })
                
                     await  Book.updateOne({_id:BookID}, {
                        $push: { "score": score }
                      })
                      return result

                       }
                   else {
                    throw new Error("Book already rated!");  
                }
              }    )
        }
      }) 
}



module.exports={
    getBookURLById,
    getBookById,  
    getAllBooks,
    deleteBookById,
    addBook,
    getAllBooksByAuthorId,
    getAllMostVisitedBooks,
    getAllBooksByGenre,
    editBook,
    addBookReview,
    addBookVisits,addScore,
    getAllMostRatededBooks,
    getBookByName
}