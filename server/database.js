const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://karanrana3095:fluHdZKdOkTRSVWT@cluster0.8xbyvaz.mongodb.net/').then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log('error');
})

const Schema=new mongoose.Schema({


    Taskname:{
        type:String,
        required:true,

    },
     TaskDone:{
        type:String,
        required:true
    }
})
const User=mongoose.model("User",Schema);
module.exports=User;