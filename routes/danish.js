const router = require('express').Router();
const jwt = require('jsonwebtoken');

//const User = require('../models/user');
router.get('/post',(req,res,next)=>{
	res.json({name:"Danish"});

})
router.post('/post',(req,res,next)=>{
	res.json({name:"Danish"});

})
router.delete('/post/:id',(req,res,next)=>{
	res.json({name:"Danish"});

})
router.put('/post/:id',(req,res,next)=>{
	res.json({name:"Danish"});

})
 module.exports = router;