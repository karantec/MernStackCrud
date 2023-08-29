import {useState,useEffect} from "react"
import axios from "axios";

import './App.css'

function App() {
  
  const [Taskname,setTaskName]=useState("");
  const [TaskDone,setTaskDone]=useState([]);
  const [list,setList]=useState([]);
  
const postData=async()=>{
  const result =await axios.post("http://localhost:8000/post",{
 Taskname:Taskname, TaskDone:TaskDone});
    console.log(result.data);
    setList([...list,{_id:result.data._id,Taskname:Taskname,TaskDone:TaskDone}])
}


const updatedData=async(id)=>{
  const newtask=prompt("Enter new task");
  const newDone=prompt("Enter new done");
  const data=axios.put(`http://localhost:8000/update/${id}`,{
    Taskname:newtask, TaskDone:newDone});
    console.log(data);
    setList(list.map((val)=>{
      return  val._id==id?{_id:id,Taskname:Taskname,TaskDone:TaskDone}:val;
    }))
}
const deleteData=async(id)=>{
  const data=await axios.delete(`http://localhost:8000/delete/${id}`,{
    Taskname:Taskname, TaskDone:TaskDone});
   console.log(data);
   setList(list.filter((val)=>{
    return val._id!=id;}))
}
useEffect(()=>{
  const getData=async()=>{
    const result=await axios.get("http://localhost:8000/get");
    console.log(result.data);
    setList(result.data);
  }
  getData();
})
  return (
    <>
    <div>
      <div className="bg-blue-900 p-3 h-[25vh]  flex flex-col ">
        <input type="text" className="m-2 w-[12rem] ml-[21rem]" placeholder="Enter tast name"
          onChange={(e)=>{
            setTaskName(e.target.value);
          }}
        />
        <input type="text" className="m-2 w-[12rem] ml-[21rem]" placeholder="Enter Taskdone"  onChange={(e)=>{
            setTaskDone(e.target.value);
          }}/>
        <button type="submit" className="bg-black rounded-md font-bold w-[8rem] ml-[21rem] text-white"
        onClick={postData}>Submit</button>

</div>
{
  list.map((val,id) => (
  <div className="bg-gray-500 text-white font-semibold w-[20rem] h-[4rem] ml-[23rem] mt-8 flex flex-end justify-end" key={id}>
    <h1 className="mr-2">{val.Taskname}</h1>
    <h2 className="mr-2 h-[3rem]">{val.TaskDone}</h2>
    <button onClick={()=>updatedData(val._id)} className="bg-white text-black font-extrabold rounded-md">Update</button>
    <button onClick={()=>deleteData(val._id)} className="bg-yellow-500 text-black font-extrabold rounded-md">delete</button>
  </div>
))

}

</div>
    </>
  )
}

export default App
