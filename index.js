const express = require('express')
const app = express();
const routes = require('./routes/routes.js')
app.use(express.json());


app.use('/api/auth', routes)
const PORT = 3000
app.listen(PORT, ()=>{
console.log(`Listen on port ${PORT}`)
})