import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content : {type: String, required: true},
    userId : {type:mongoose.Schema.Types.ObjectId, ref: "Users"}
});

export default mongoose.model("Post", PostSchema);