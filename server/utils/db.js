const { Console } = require("console");
const mongoose = require("mongoose");

//const URI = "mongodb://127.0.0.1:27017/nisarg";

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("successful");
    } catch (error) {
        console.error(error);
        process.exit(1); 
    }
};

module.exports = connectDB;