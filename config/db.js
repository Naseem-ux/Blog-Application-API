const mongoose  = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();


const dbConnection = async()=>{
    try{

        if (mongoose.connection.readyState === 1) {
                    return mongoose.connection;
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");

        return mongoose.connection;
        
    }
    catch (error) {
        console.error("MongoDB Connection Failed:", error);
        throw error;
    }
}

module.exports = { dbConnection }