const express=require("express")
const app=express()
const ejs=require("ejs")
// const { json } = require("body-parser")

//express view engine
app.set("view engine","ejs")
app.use(express.static("public"))


app.get("/",(req,res)=>{
    res.render("iss position")
})



const port=process.env.PORT ||3000
app.listen(port,()=>console.log(`server is listning on port ${port}`))