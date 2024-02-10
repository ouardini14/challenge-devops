const User=require('../../models/User');
const Book=require('../../models/Book');

const getAllUsers=async()=>{
   return await User.find({roles:'user'});
}

const editUser=async(id,p)=>{ 
   return await  User.findByIdAndUpdate(id,p).exec()
}

const getUserById=async(id)=>{
   return await User.findById(id).select('-password -__v   ');
}


const getBooks=async(id,args)=>{
         return await User.findById(id).populate({
            path:'BookLibrary',
            select:'_id name CoverPic rating PublishDate ',
            options: {
               limit: args.qt,
               skip: args.start
           }
          }).select('BookLibrary -_id')
 }
 const getBooksId=async(id)=>{
   let user=await User.findById(id).select('BookLibrary');
          return user.BookLibrary;
       
  }


 const addBookToLibrary=async(userID,BookId)=>{

         return await User.findByIdAndUpdate(userID,{ $push:{ 'BookLibrary':BookId}});
     

}


const removeBookFromoLibrary=async(userID,BookId)=>{
   // Book.exists({_id:BookId},async (error, result)=>{
   //    if (error){
   //       throw new Error("Not found !");      }
   //       else { }
   //  })

         return await User.findByIdAndUpdate(userID,{ $pull:{ 'BookLibrary':BookId}});
     
}

const DeleteUser=async(id)=>{
   return await User.deleteOne({_id:id});
}

module.exports={getBooksId,DeleteUser,getAllUsers,getBooks,addBookToLibrary,editUser,removeBookFromoLibrary,getUserById}