import express from 'express';
import path from 'path'
import {fileURLToPath} from 'url'
import mongoose from 'mongoose';
const app = express();
const port = process.env.PORT || 3000;

const file = fileURLToPath(import.meta.url)
const __dirname = path.dirname(file)

app.set("view engine","ejs");
app.set("views" , path.join(__dirname , "/views"))
app.use(express.static(path.join(__dirname  , "/public")))
app.use(express.urlencoded({extended:true}))



await mongoose.connect('mongodb://localhost:27017/student')

let schema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    gender:String
})

const student = mongoose.model("student",schema);


app.get("/" , (req,res)=>{
    res.render("home")
})

app.post("/submit" ,async (req,res)=>{
    let data = req.body;
    let newdata = new student(data);
    await newdata.save();
    console.log(data)
    res.render("submit" , {data});
})

app.listen(port,()=>{
    console.log(`server is listen on ${port}`)
})