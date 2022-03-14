const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {

    return mongoose.connect("mongodb://127.0.0.1:27017/Banking_System")
}


const UserSchema = mongoose.Schema(
    {
        firstName :{type:String, require: true},
            middleName  :{type:String, require: true},
            lastName   :{type:String, require: true},
            age :{type:String, require: true},
            email  :{type:String, require: true},
            address  :{type:String, require: true},
            gender  :{type:String, require: true},     
    },
    {
      versionKey: false,
      timestamps: true, 
    }
  );

const User = mongoose.model("users",UserSchema)

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send({ users: users }); // []
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong .. try again later" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const post_user = await User.create(req.body)

    return res.status(200).send(post_user); // []
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong .. try again later" });
  }
});

const branchdetailSchema = mongoose.Schema(
  {
    name  :{type:String, require: true},
    address   :{type:String, require: true},
    IFSC     :{type:String, require: true},
    MICR  :{type:String, require: true},
  },
  {
    versionKey: false,
    timestamps: true, 
  }
);

const BranchDetailSchema = mongoose.model("branchdetail",branchdetailSchema)

app.get("/branch", async (req, res) => {
try {
  const users = await BranchDetailSchema.find().lean().exec();

  return res.status(200).send({ users: users }); // []
} catch (err) {
  return res
    .status(500)
    .send({ message: "Something went wrong .. try again later" });
}
});



const MasterAccountSchema = mongoose.Schema(
    {
      balance   :{type:String, require: true},
      
    },
    {
      versionKey: false,
      timestamps: true, 
    }
  );

const MasterAccount = mongoose.model("masteraccount",MasterAccountSchema)

app.get("/masteraccount", async (req, res) => {
  try {
    const users = await MasterAccount.find().lean().exec();

    return res.status(200).send({ users: users }); // []
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong .. try again later" });
  }
});



const SavingsAccountSchema = mongoose.Schema(
  {
    account_number   :{type:String, require: true},
    balance    :{type:String, require: true},
    interestRate      :{type:String, require: true},
    MIstartDate:{type:String, require: true},
    maturityDate :{type:String, require: true},
  },
  {
    versionKey: false,
    timestamps: true, 
  }
);

const SavingsAccount = mongoose.model("savingsaccount",SavingsAccountSchema)

app.get("/savingsaccount", async (req, res) => {
try {
  const users = await SavingsAccount.find().lean().exec();

  return res.status(200).send({ users: users }); // []
} catch (err) {
  return res
    .status(500)
    .send({ message: "Something went wrong .. try again later" });
}
});







app.listen(4000, async()=>{

    try{
        await connect();
    }
    catch(err){
        console.log(err)
    }

    console.log("listen at 4000 port ")
})
