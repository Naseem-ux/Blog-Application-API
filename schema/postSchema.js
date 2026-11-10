const {model,Schema} = require("mongoose")

const schema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim: true

    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
}, {timestamps:true})

const postSchema = new model("Post",schema)

module.exports = {postSchema}