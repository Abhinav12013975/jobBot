const mongoose = require('mongoose')
require('dotenv').config();
const dbConnection = async()=> {
   
         mongoose.connect(process.env.MONGO_URI).
         then(()=>{console.log("Database connected successfully")}).
         catch((error)=>{console.log(error)})
       
    };
    
    module.exports = dbConnection;
