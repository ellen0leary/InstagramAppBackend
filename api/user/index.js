import e from 'express';
import express from 'express';
import User from './userModel.js';
// import jwt from 'jso'

const router = express.Router();

router.get('/', (req, res,next) => {
    User.find().then(users =>  res.status(200).json(users)).catch(next);
});

router.post('/', (req, res, next)=>{
    console.log(req.body.userName);
    console.log(req.body.password);
    if(!req.body.userName || !req.body.password){
        res.status(401).json({
            success: false,
            msg: 'Please pass username and password.',
          });
    }else{
        const user = User.findByUserName(req.body.userName)
        if(!user ){
            res.status(401).json({
                success: false,
                msg: 'No account .',
              });
        }else if( user.password != req.body.password){
            console.log(user.password)
            res.status(401).json({
                success: false,
                msg: ' incorect password.',
              });
        } else{
        res.status(200).json({
            success: true,
            msg: 'You have logged in.',
          });
        }
    }
    
});

// router.put();
// router.delete();

//get users - register/login user - update user - follow another user - get following
export default router;