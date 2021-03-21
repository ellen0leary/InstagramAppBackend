import mongoose from "mongoose"

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type:String, required: true},
    password: {type: String, required: true},
    dateOfBirth: {type: Date, required: true, unique: true},
    following: [{type:mongoose.Schema.Types.ObjectId, ref: "Users"}]
});

UserSchema.statics.findByUserName = function (username) {
    return this.findOne({ username: username });
  }; 

  UserSchema.method.findPassword = function () {
      console.log(this)
    return this.password;
  }; 

export default mongoose.model('User', UserSchema);

//id - name - username - dob - following (array of userIds) - 