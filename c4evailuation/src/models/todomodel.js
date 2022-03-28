const  mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title:{type:String, required:true},
    UserId:{
            type:mongoose.Schema.type.Object,
            ref:"user",
            required:true
    }
    

},{
    timestamps:true,
    versionKey:false

})

const Todo = mongoose.model("user", TodoSchema);

module.exports = Todo;