import express from 'express';
import User from './userModel.js';
// import jwt from 'jso'

const router = express.Router();

//gets all users
router.get('/', (req, res, next) => {
    User.find().then(users => res.status(200).json(users)).catch(next);
});

//log in
router.post('/', async (req, res, next) => {
    console.log(req.body.userName);
    console.log(req.body.password);
    const user = await User.findByUserName(req.body.userName)
    if (!req.body.userName || !req.body.password) {
        res.status(401).json({
            success: false,
            msg: 'Please pass username and password.',
        });
    } else {
        if (!user) {
            res.status(401).json({
                success: false,
                msg: 'No account .',
            });
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    // return the information including token as JSON
                    res.status(200).json({
                        success: true,
                        // token: 'BEARER ' + token,
                        msg : "You have logged in"
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        msg: ' incorect password.',
                    });
                }
            });
        }}
});

//get by username
router.get('/:name', (req,res,next) => {
    console.log(req.params.name)
     User.findByUserName(req.params.name).then(user => res.status(200).json( user));
    
})

//follow user
router.post('/:userId/following/:id', (req, res,next) =>{
    console.log(req.params.id);
    console.log(req.params.id);
});
// router.put();
// router.delete();

//get users - register/login user - update user - follow another user - get following
export default router;