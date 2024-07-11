const User=require("../models/user_model");
const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find({},{password:0});
        if(!users ||  users.length===0){
            return res.status(404).json({message:"No users found"});
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
};

const deleteById=async(req,res)=>{
    try {
        const id=req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message:"user deleted sucessfully"});
    } catch (error) {
        console.log(error);
    }
}

module.exports={getAllUsers,deleteById};