const mongoose = require('mongoose');
const mongUri = "mongodb://localhost:27017/inotebook";

const connectToMongo =  ()=>{
    mongoose.connect(mongUri,()=>{
        console.log("connection successful");
    })
};

module.exports = connectToMongo;