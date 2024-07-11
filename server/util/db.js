const mongoose=require('mongoose');

const URI=process.env.MONGODB;

const connectDB=async()=>
{
    try{
        await mongoose.connect(URI);
        console.log("connected to db");
    }catch(err){
        console.log("connection failed");
        process.exit(0);
    }
}

module.exports=connectDB;
