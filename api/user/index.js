import express from 'express';
import User from './userModel.js';
// import jwt from 'jso'

const router = express.Router();

router.get('/', (req, res,next) => {
    User.find().then(users =>  res.status(200).json(users)).catch(next);
});

// router.post('/', (res, req, next)=>{
//     User.find().then(users => res.statusCode(200).json(users)).catch(next);
// });

// router.put();

// router.delete();

//get users - register/login user - update user - follow another user - get following
export default router;