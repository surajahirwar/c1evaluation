const  mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName :{type:String, required:false},
    email :{type:String, required:true},
    password :{type:String, required:true}
  

},{
    timestamps:true,
    versionKey:false

})

const User = mongoose.model("user", UserSchema);

module.exports = User;