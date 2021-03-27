import express from 'express';
import User from './userModel.js';
// import jwt from 'jso'

const router = express.Router();

router.get('/', (req, res, next) => {
    User.find().then(users => res.status(200).json(users)).catch(next);
});

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


router.get('/search', (req,res,next) => {
    console.log(req.query.user)
    const user = User.findByUserName(req.query.user);
    console.log(user.userName)
    if(!user){
        res.status(400).json( {
            success : false,
            msg: "No"
        })
    } else{
        res.status(200).json( user)
    }
    
})
// router.put();
// router.delete();

//get users - register/login user - update user - follow another user - get following
export default router;