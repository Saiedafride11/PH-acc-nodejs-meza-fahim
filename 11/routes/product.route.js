const express=require('express')
const router=express.Router()
const productController = require('../controllers/product.controller')
const uploader = require("../middleware/uploader");
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

// const multer = require('multer');
// const uploader = multer({ dest: "image/"})



// router.use(verifyToken); // jodi chai sob route token check korbe

// single image
// router.post("/file-upload", uploader.single("image"), productController.fileUpload);
// multiple image
router.post("/file-upload", uploader.array("image"), productController.fileUpload);


{/* <input type="file" name="image" /> */}
// const formData = new FormData();
// formData.append("image", forData);

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router.route('/')
.get(productController.getProducts)
// .post(productController.createProduct)
// .post(verifyToken, productController.createProduct)
.post(verifyToken, authorization("admin", "store-manage"), productController.createProduct); // login takte hbe verify token diye + shudu admin product add korte parbe

router.route("/:id")
.patch(productController.updateProductById)
.delete(productController.deleteProductById)

module.exports=router