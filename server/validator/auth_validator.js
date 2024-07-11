const {z}=require('zod');


const signupSchema=z.object({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"name must be at least 3 char"})
    .max(255,{message:"name must be at most 255 char"}),
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"invalid email address"})
    .min(3,{message:"email must be at least 3 char"})
    .max(255,{message:"email must be at most 255 char"}),
    phone:z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{message:"phone must be at least 10 char"})
    .max(20,{message:"phone must be at most 20 char"}),
    password:z
    .string({required_error:"password is required"})
    .min(7,{message:"password must be at least 7 char"})
    .max(1024,{message:"password must be at most 1024 char"}),

})

module.exports=signupSchema;