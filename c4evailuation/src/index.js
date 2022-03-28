const express  = require("express");
const conenct = require("./config/db")
const app = express();

app.use(express.json())

const {login , register} = require("./controllers/usercontroller")
const todosuser = require("./controllers/todocontroller")

app.use("/login", login)
app.use("/register", register)
app.use("/todos", todosuser)




app.listen(5000, async () =>{   
    try{
         await conenct();
         console.log("listen at post 5000")
    }
    catch(err){
        console.log(err)

    }
})