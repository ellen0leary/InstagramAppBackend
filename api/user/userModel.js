import mongoose from "mongoose"

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type:String, required: true},
    dateOfBirth: {type: Date, required: true, unique: true},
    following: [{type:mongoose.Schema.Types.ObjectId, ref: "Users"}]
});

export default mongoose.model('User', UserSchema);

//id - name - username - dob - following (array of userIds) - 