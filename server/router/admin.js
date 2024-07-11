const express=require('express');
const router=express.Router();
const adminController=require("../controller/admin-controller")
const authMiddleware=require("../middlewares/authMiddleware");
const adminMiddleware = require('../middlewares/admin-middleware');

router.route('/users').get(authMiddleware,adminMiddleware,adminController.getAllUsers);
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,adminController.deleteById);
module.exports=router;