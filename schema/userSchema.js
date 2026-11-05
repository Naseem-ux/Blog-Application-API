const {Schema, model} = require("mongoose")

const schema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
},{ timestamps: true })

const userSchema = new model("User",schema)

module.exports = {userSchema}
