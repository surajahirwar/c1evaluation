const express=require("express")

const mongoose=require("mongoose")

const app=express()

app.use(express.json())

const connect=()=>{
  return mongoose.connect("mongodb://127.0.0.1:27017/Banking_System")
}


 const User=new mongoose.Schema({
  firstName:{type:String,required:true},
  middleName:{type:String,required:false},
  lastName:{type:String,required:true},
  age:{type:String,required:true},
 email:{type:String,required:true},
 address:{type:String,required:true},
 gender:{type:String,required:false,default:"female"},
 masterId:
 {
     type:mongoose.Schema.Types.ObjectId,
     ref:"masteraccounts",
     required:true
 }
},
{
    timestamps:true,
    versionkey:false
})

const user=mongoose.model("user",User)

// branch detail schema

const BranchDetail=new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    IFSC:{type:String,required:true},
    MICR:{type:Number,required:true}
   
  },
  {
      timestamps:true,
      versionkey:false
  })
  
  const branchdetails=mongoose.model("branchdetails",BranchDetail)
  
// master accound schema

const MasterAccount=new mongoose.Schema({
    balance:{type:String,required:true},
    userId:
 {
     type:mongoose.Schema.Types.ObjectId,
     ref:"user",
     required:true
 },
 branchId:
 {
     type:mongoose.Schema.Types.ObjectId,
     ref:"branchdetails",
     required:true
 }
   
  },
  {
      timestamps:true,
      versionkey:false
  })
  
  const masteraccount=mongoose.model("masteraccounts",MasterAccount)
  


 const SavingsAccount=new mongoose.Schema({
    accountNumber:{type:String,required:true,unique:true},
    balance:{type:String,required:true},
    interestRate:{type:String,required:true},
    masteraccountId:
 {
     type:mongoose.Schema.Types.ObjectId,
     ref:"masteraccounts",
     required:true
 }
   
  },
  {
      timestamps:true,
      versionkey:false
  })
  
  const savingsaccount=mongoose.model("savingsaccounts", SavingsAccount)
   
  
    const FixedAccount=new mongoose.Schema({
        accountNumber:{type:String,required:true,unique:true},
        balance:{type:String,required:true},
        interestRate:{type:String,required:true},
        StartDate:{type:String,required:true},
        MaturityDate:{type:String,required:true},
        masteraccountId:
       {
           type:mongoose.Schema.Types.ObjectId,
           ref:"masteraccounts",
           required:true
       }
      },
      {
          timestamps:true,
          versionkey:false
      })
      
      const fixedaccount=mongoose.model("fixedaccounts", FixedAccount)



   app.get("/masteraccounts",async(req,res)=>{
       try {
           const master=await masteraccount.find().lean().exec()
           return res.send(master)
       } catch (error) {
           console.log(error)
       }
   })

//    2)
 app.post("/savingsaccount",async(req,res)=>{
    try {
        const savings=await savingsaccount.create(req.body)
        return res.send(savings)
    } catch (error) {
        console.log(error)
    }
 })

//  3)

app.post("/fixedaccounts",async(req,res)=>{
    try {
        const fixed=await fixedaccount.create(req.body)
        return res.send(fixed)
    } catch (error) {
        console.log(error)
    }
 })

//  4)

app.listen(4000,async()=>{
    try {
       await connect()
        console.log("listen at 4000")
    } catch (error) {
        console.log(error)
    }
})
