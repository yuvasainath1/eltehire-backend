const express = require("express");
const app=express();
const path=require("path");
const connectDatabase=require('./config/database');
const cors=require('cors')

connectDatabase();

app.use(cors({
    origin:"http://localhost:3001",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
    },{
    origin:"https://work-nest-omega.vercel.app",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
    }

));
app.use(express.json());

const tester= require('./routes/test');
const user=require('./routes/Usersroutes');
const admin=require('./routes/adminroutes');
const work=require('./routes/workroutes');

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/api/v1",tester);
app.use("/api/v1/user",user);
app.use("/api/v1/admin",admin);
app.use("/api/v1/work",work);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;