const express=require('express');
const router=express.Router();
const adminController=require("../controller/admin-controller")
const authMiddleware=require("../middlewares/authMiddleware");
const adminMiddleware = require('../middlewares/admin-middleware');
const formidable=require("express-formidable") 

router.route('/users').get(authMiddleware,adminMiddleware,adminController.getAllUsers);
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,adminController.deleteById);
router.route("/additem").post(authMiddleware,adminMiddleware,formidable(),adminController.addItem);
module.exports=router;