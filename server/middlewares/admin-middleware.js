const adminMiddleware=async(req,res,next)=>{
    try {
        console.log(req.user);
        const adminRole=req.user.isadmin;
        if(!adminRole){
            return res.status(403).json({error:"Access denied.User is not admin"});
        }
        // res.status(200).json({msg:req.user.isadmin});
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports=adminMiddleware;