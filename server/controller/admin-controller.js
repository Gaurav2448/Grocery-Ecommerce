const User=require("../models/user_model");
const item_model=require("../models/item_model");
const fs=require("fs");
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

const addItem=async(req,res)=>{
    try{
        const {item_name,price}=req.fields;
        const {image}=req.files
        const Items=new item_model({...req.fields})
        if(image){
            Items.image.data=fs.readFileSync(image.path);
        }
        await Items.save();
        return res.status(200).json({message:"Item uploaded sucessfully"});
    }catch(err){
        return res.status(500).json({message:"unable to upload"});
    }
}

module.exports={getAllUsers,deleteById,addItem};