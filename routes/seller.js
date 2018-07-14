const router= require('express').Router();
const Product = require('../models/product');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new aws.S3({accessKeyId:"AKIAIHAYMD7F63ZAEU6A", secretAccessKey:"onW1DpN4RvSa+n5zKaoxZAHq/MfBI/FyDoyOL/Lb"});


const checkJWT = require('../middleware/check-jwt');
const faker = require('faker');


const upload = multer({
	storage: multerS3({
	   s3: s3,
	   bucket: 'amazonowebapp1',
	   metadata: function(req, file, cb){
	   	 cb(null , {fieldName:file.fieldname});
	   },
	   key: function(req, file, cb){
	   	 cb(null , Date.now().toString());
	   }
	})
});



router.route('/products')
.get(checkJWT,(req,res,next)=>{
	Product.find({ owner : req.decoded.user._id })
	 .populate('category')
	 .populate('owner')
     .exec((err, products)=>{
		if(products){
			res.json({
				success:true,
				message:"Products",
				products:products

			});
		}
   	});
})
.post([checkJWT, upload.single('product_image')], (req,res,next)=>{

	let product = new Product();
	product.owner=req.decoded.user._id;
	product.category = req.body.categoryId;
	product.title = req.body.title;
	product.price = req.body.price;
	product.description = req.body.description;
	product.image = req.file.location;
	product.save();
	res.json({
		success:true,
		message:'successfully added the product'
	})
});


 module.exports = router;