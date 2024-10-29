const express=require('express');
const router=express.Router();
const Items=require("../controller/item-controller");

router.route("/getitems").get(Items.Getitems);
router.route("/item-image/:id").get(Items.GetItemImage);
router.route("/deleteitem/:id").delete(Items.DeleteItem);
router.route("/item-count").get(Items.ProductCount);
router.route("/item-list/:page").get(Items.ProductList);


module.exports=router;