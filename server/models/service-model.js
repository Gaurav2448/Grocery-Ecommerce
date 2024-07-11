const {Schema,model,Mongoose}=require("mongoose");

const seviceSchema=new Schema({
    service:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    provider:{type:String,required:true},
});

const Service=new model("Services",seviceSchema);

module.exports=Service;