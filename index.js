const dotenv = require('dotenv');
const express = require('express');
const { db } = require('./models/User.js');
const app = express();
const routes = require('./routes/routes.js')
dotenv.config()
const dbConnect = require('./config/db.js')
app.use(express.json());

dbConnect()
app.use('/api/auth', routes)
const PORT = 3000
app.listen(PORT, ()=>{
console.log(`Listen on port ${PORT}`)
})