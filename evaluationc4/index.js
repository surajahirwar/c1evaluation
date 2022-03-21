const express = require("express");
const mongoose = require("mongoose");
var validator = require('validator');

const app = express();

app.use(express.json());

const connect = () => {
	return mongoose.connect("mongodb://127.0.0.1:27017/small_books_system")
}


const = UserSchema = new mongoose.Schema({

	firstName :{ type:String, required: true},
	lastName :{type:String},
	age :{type:Number},
	email :{type:String, required:true, unique:true},
	profileImages:{type:String},
	timestamps :{type:String, required:true}
},
{
	timestamp:true
	
});
const User = mongoose.model("users",UserSchema);




const = BookSchema = new mongoose.Schema({

	userId:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"users",
			required:true
	},
	likes  :{ type:Number, required: true, default:0;},
	coverImage :{type:String, required:true},
	content :{type:String, required:true},
	timestamps :{type:String, required:true}
},
{
	timestamp:true
	
});
const Book = mongoose.model("books",BookSchema);



const = PublicationSchema = new mongoose.Schema({
	userId:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"users",
			required:true
	},
	bookId:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"books",
			required:true
	},
	timestamps :{type:String, required:true}
},
{
	timestamp:true
	
});
const Publication = mongoose.model("publication",PublicationSchema);




const = CommentSchema  = new mongoose.Schema({
	userId:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"users",
			required:true
	},
	bookId:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"books",
			required:true
	},
	body:{type:String, required:true},
	timestamps :{type:String, required:true}
},
{
	timestamp:true
	
});

const Comment = mongoose.model("comment",CommentSchema);




app.post("/register",
	body("firstName").not().isEmpty().isLength({ min: 3, max:30 }),
	body("age").not().isEmpty()
	.withMessage("age should be between 1 and 150")
	.custom((value)=>{
		if(value<3||value>30){
			throw new Error("incorreat age provided")
		}
		return true
	})
	 async(req, res)=>{

	try{
		const error = validationResult(req);
		if(!error.isEmpty()){
			return res.status(400).json({
				error:error.array()
			})
		}
		const user = await User.create(req.body)
		return res.status(200).send(user)
	}
	catch(err){
		return res.status(500).send({message:err.message});
	}
})




app.post("/books",body("coverImage").not().isEmpty(), async(req, res)=>{

	try{
		const error = validationResult(req);
		if(!error.isEmpty()){
			return res.status(400).json({
				error:error.array()
			})
		}

		const book = await Book.create(req.body)
		return res.status(200).send(book)
	}
	catch(err){
		return res.status(500).send({message:err.message});
	}
})



app.post("/comments", body("userId").not().isEmpty(),body("bookId").not().isEmpty(),body("body").not().isEmpty(), async(req, res)=>{

	try{
		const error = validationResult(req);
		if(!error.isEmpty()){
			return res.status(400).json({
				error:error.array()
			})
		}

		const comment = await Comment.create(req.body)
		return res.status(200).send(comment)
	}
	catch(err){
		return res.status(500).send({message:err.message});
	}
})


app.psot("/login",
	body("email").not().isEmpty()
	.withMessage("email should be required")
	.custom((value)=>{
		if(email!==res.param.email){
			throw new Error("please try again")
		}
		return true
	}),

	async(req, res)=>{

	try{
		const comment = await Comment.create(req.body)
		return res.status(200).send(comment)
	}
	catch(err){
		return res.status(500).send({message:err.message});
	}
})






app.listen(5000, async()=>{
	try{
		await connect();
		console.log("listening at 5000 port")

	}
	catch(err){

		console.log(err)

	}
})