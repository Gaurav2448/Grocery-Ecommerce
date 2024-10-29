const {Schema,model,Mongoose, default: mongoose}=require("mongoose");

const ItemSchema=new Schema({
    item_name:{type:String,required:true},
    image:{data:Buffer,contentType:String},
    price:{type:String,required:true},
    
});

module.exports= mongoose.model('Items',ItemSchema);