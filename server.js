const express=require('express');
const userRoutes=require('./userRoutes')
const cors=require('cors');
const app=express();
require('./db');
app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(userRoutes);

const port =process.env.PORT || 5000;


app.listen(port,()=>{
    console.log("server is running at port 5000");
})