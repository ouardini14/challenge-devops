const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors=require("cors")
const userouter = require("./routes/userouter")
const bookrouter = require("./routes/bookrouter")
const Authorrouter = require("./routes/Authorrouter")


require("dotenv").config();
app.use(express.json())    

mongoose.connect(process.env.MONGO_URL)
    .then(result=>{
        app.listen(process.env.PORT,()=>{
            console.log("Server is running ! ");
        })
        console.log("good connection")})
        
    .catch(err=>console.log(err))  
    

          app.use(cors());
          app.use('*',(req,res,next)=>{/*
            const apiHeader = req.headers['x-api-key']
            const api = apiHeader && apiHeader.split(' ')[1]
            if(api!==process.env.API_KEY || api==null)
           { return  res.status(403).send({ error: { code: 403, message: "You not allowed." } });}*/
            next()
          });
    app.use("/users",userouter)
    app.use("/Books",bookrouter)
    app.use("/Authors",Authorrouter)





