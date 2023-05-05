const mongoose=require('mongoose');
require('dotenv').config({ path: ".env" });
//const uri=process.env.MONGO_URL;
mongoose.connect(`${process.env.MONGO_URL}`, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log('Connected')
}).catch((error)=> console.log(error))