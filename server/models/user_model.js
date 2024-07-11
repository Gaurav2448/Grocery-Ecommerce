const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },
    isadmin:{
        type:Boolean,
        default:false
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    try{
        const saltRound=await bcrypt.genSalt(10);
        const hash_password=await bcrypt.hash(this.password,saltRound);
        this.password=hash_password;

    }catch(err){next(err);}
    
});

userSchema.methods.generateToken=async function(){
    try{
        return jwt.sign({
            _id:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin
        },process.env.SECRET_KEY,
        {
            expiresIn:"30d"
        }
        );
       
    }catch(err){
        console.log(err);
    }
}

userSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password, this.password);
}

const User=mongoose.model('User',userSchema);

module.exports=User;