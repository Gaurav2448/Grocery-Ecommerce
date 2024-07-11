const express=require('express');
const router=express.Router();
const auth_controller=require("../controller/auth-controller");
const signupSchema=require('../validator/auth_validator')
const validate=require('../middlewares/validate-middleware');
const authMiddleware=require('../middlewares/authMiddleware');

router.route('/').get(auth_controller.home);
router.route('/register').post(validate(signupSchema) , auth_controller.register);
router.route('/login').post(auth_controller.login);

router.route('/user').get(authMiddleware,auth_controller.user);


module.exports=router;