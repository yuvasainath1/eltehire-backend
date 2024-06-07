const mongoose=require("mongoose");
require('dotenv').config();

const connectDatabase=()=>{
    try{
        mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: `${process.env.DB_NAME}`
          }).then((data)=>{
            console.log(`Mongoose is connected to server:${data.connection.host}`);
          })
    }catch(error){
        console.log("Error in connecting to database");
    }
};

module.exports = connectDatabase;