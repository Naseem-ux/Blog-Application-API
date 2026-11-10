const { Schema, model } = require("mongoose");

const schema = new Schema({
   post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true
   },
   text: {
      type: String,
      required: true,
      trim: true
    },
   author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   }
}, { timestamps: true })

const commentSchema = new model("Comment", schema)


module.exports = { commentSchema }