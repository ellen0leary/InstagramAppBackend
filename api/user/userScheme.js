import mongoose, { Mongoose } from "mongoose"

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    dateOfBirth: {type: Date},
    following: {type:mongoose.Schema.Types.ObjectId, ref: "Users"}
});

export default mongoose.model('User', UserSchema);

//id - name - username - dob - following (array of userIds) - 