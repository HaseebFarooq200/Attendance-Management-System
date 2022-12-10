const dotenv = require('dotenv')
const express = require('express')
const app = express()
dotenv.config({path: './config.env'})
const PORT = process.env.PORT || 4040
require('./db/conn.js')
app.use(express.json());
app.use(require('./router/route.js'))

if ( process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })  
}
app.listen(PORT, ()=>{
  console.log("Server is running on PORT",PORT)  
})