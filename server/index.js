const express=require('express');
const app=express();
const User=require('./database')
const cors = require("cors");
const PORT=8000;
app.use(cors());
app.use(express.json());
//home rute
app.get("/",(req,res)=>{
    res.send("hello world");
})
//create route
app.post("/post",async(req,res)=>{
    try{
        const data=new User(req.body);
        const save=await data.save();
        console.log("Added data");
        res.send(save);

    }catch(error){
        console.log(error);

    }
   
})
//ready data
app.get("/get",async(req,res)=>{
    try{
        const finddata=await User.find({});
        
        res.send(finddata);
    }
    catch(error){
        console.log(error);

    }
})
//put
app.put("/update/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const update=await User.findByIdAndUpdate({_id:id},req.body,{new:true}) ;
        console.log("Data Updated");
        res.send(update);
    }
    catch(error){
        console.log(error);
    }
    
})
//delete
app.delete("/delete/:id",async(req,res)=>{
    try{
        const deleteData=await User.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.send(deleteData);
    }
    catch(error){
        console.log(error);
    }
    
})

app.listen(PORT,()=>{   
    console.log("Server running on");
})