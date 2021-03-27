import mongoose from "mongoose"
import bcrypt from 'bcrypt-nodejs';
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
    return this.findOne({ userName: username });
  }; 
  UserSchema.statics.findByid = function (id) {
    return this.findOne({ _id: id });
  }; 

  UserSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        console.log(passw)
        console.log(this.password)
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


  UserSchema.pre('save', function(next) {
    const user = this; 
    console.log("starting" +user.userName)
        bcrypt.genSalt(10, (err, salt)=> {
            if (err) {
                console.log("gensalt " + err)
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, (err, hash)=> {
                if (err) {
                    console.log("hash error " +err)
                    return next(err);
                }
                console.log("hash " + hash)
                user.password = hash;
                console.log(user.password)
                next();
            });

        });
        console.log(user.password)
    } );

export default mongoose.model('User', UserSchema);

//id - name - username - dob - following (array of userIds) - 