import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content : {type: String, required: true},
    userId : {type:mongoose.Schema.Types.ObjectId, ref: "Users"}
});

PostSchema.statics.findByUserId = function(user) {
    return this.find({userId: user});
}

PostSchema.statics.findByid = function(id) {
    return this.find({_id: id});
}
export default mongoose.model("Post", PostSchema);