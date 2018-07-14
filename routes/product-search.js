const router = require('express').Router();
const algoliasearch = require('algoliasearch');
const client  = algoliasearch ('F2R9L0SHFF', '9c2c8497026a05252c69b11c88bbafe2');
const index = client.initIndex('amazonov1');  


router.get('/',(req,res,next)=>{
	if(req.query.query){
		index.search({
			query:req.query.query,
			page:req.query.page
		},(err,content)=>{
			res.json({
			  success:true,
			  message:"here is your search",
			  status:200,
			  content:content,
			  search_result:req.query.query
			});
		});
	}
});

module.exports= router;