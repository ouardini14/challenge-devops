const User=require('../../models/User');


const getAllAdmins=async()=>{
    return await User.find({roles:'admin'}).select("-password -__v -RatedBooks -BookLibrary");
}

const DeleteAdmin=async(id)=>{
    return await User.deleteOne({_id:id});
}









module.exports={ getAllAdmins,DeleteAdmin}