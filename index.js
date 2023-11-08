const express = require('express')

const app = express()
app.use(express.json());
const port = 3000;
const mongoose=require("mongoose");
const mongoDBURL=
"mongodb+srv://Nvarshinitechnologies:Nvarshinitechnologies123@cluster0.nlilmqn.mongodb.net/"
;


const userSchema= new mongoose.Schema({
    username:String,
    password:String
});

const todosSchema= new mongoose.Schema({
    title:String,
    description:String


})
//defining mongoose models
const user=mongoose.model('user',userSchema);
const todos=mongoose.model('todos',todosSchema);

mongoose
.connect(mongoDBURL)
.then(()=>{
console.log("connected to database");
app.listen(port,()=>{
    console.log("listening to port 3000");
});
})
.catch((error)=>{
    console.log(error);

})

app.get("/todos",async(req,res)=>{
 try{
    const todo=await todos.find({});
    console.log(todo)
    res.json(todo);

 }
 catch(error){
    console.log(error);
    res.status(500).send({message:error.message});
 }
});

app.post("/todos",async (req,res)=>{
  
    try{
        if(!req.body.title||!req.body.description){
            req.status(400).send("send all the required feilds");
        }
        const newtodo={
            title:req.body.title,
            description:req.body.description
        };
        console.log(req.body);
        await todos.create(newtodo);
        res.status(200).send("sucessfully added");

    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error});
    }

})
app.get("/todos/:id",async(req,res)=>{
   try{
    const {id}=req.params;
    const todo= await todos.findById(id);
    res.status(200).json(todo);
   }
   catch(error){
    console.log(error.message);
    res.status(500).send({message:error.message})
   }
})

app.put("/todos/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const result= await todos.findByIdAndUpdate(id,req.body);
        res.status(200).send(result);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }

})
 app.delete("/todos/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        await todos.findByIdAndDelete(id);
        res.status(200).send("deleted sucessfully");

    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
 })



