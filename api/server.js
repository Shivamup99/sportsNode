const express = require('express')
const port = process.env.PORT||2000;
const connection = require('./model/db');
connection();
const user = require('./routes/user')
const about = require('./routes/about')
const app = express();
app.use(express.json());
app.use('/',user);
app.use('/',about)
app.use("/upload", express.static("upload"));
app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})