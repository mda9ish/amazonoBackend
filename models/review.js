const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const ReviewSchema = new Schema({
	owner:{type: Schema.Types.ObjectId, ref:'User'},
	rating: { type: Number, default: 0},
	title: String,
	description:String,
	
	created:{type:Date,default:Date.now}
});
module.exports = mongoose.model('Review', ReviewSchema);