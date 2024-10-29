const item_model=require("../models/item_model");
const fs=require("fs");

const Getitems=async(req,res)=>{
    try {
        const items=await item_model.find({}).select("-image").limit(12);
        return res.status(200).json(items);

    } catch (error) {
        console.log(error);
    }

}

const GetItemImage=async(req,res)=>{
    try {
        const item=await item_model.findById(req.params.id).select("image");
        if(item.image.data){
            res.set('Content-type',item.image.contentType );
            return res.status(200).send(item.image.data);
        }
        else {
            return res.status(404).send("Image not found");
          }
    } catch (error) {
        console.log(error);
    }
}

const DeleteItem=async(req,res)=>{
    try {
        await item_model.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success:true,
            message:"item deleted",
        }
        )
        
    } catch (error) {
        console.log(error);
    }
}

const ProductCount=async(req,res)=>{
    try {
        const total=await item_model.find({}).estimatedDocumentCount();
        return res.status(200).json(total);
    } catch (error) {
        console.log(error);
    }
}

const ProductList=async(req,res)=>{
    try {
        const Perpage=2;
        const page=req.params.page?req.params.page:1;
        const items=await item_model.find({}).select("-image").skip((page-1)*Perpage).limit(Perpage);
        return res.status(200).json(items);
    } catch (error) {
        console.log(error);
    }
}
module.exports={Getitems,GetItemImage,DeleteItem,ProductCount,ProductList};