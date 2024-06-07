const app=require(".");
const connectDatabase=require('./config/database');
require('dotenv').config();

connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on port ${process.env.PORT}`);
});
