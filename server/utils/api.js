import express from "express";

const apiRoutes=express.Router;

apiRoutes.post('/login',(req,res)=>{
    res.send("login");
})