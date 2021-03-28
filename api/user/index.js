import express from 'express';
import User from './userModel.js';
// import jwt from 'jso'

const router = express.Router();

//gets all users
router.get('/', (req, res, next) => {
    console.log("here")
    User.find().then(users => res.status(200).json(users)).catch(next);
});

//log in
router.post('/', async (req, res, next) => {
    console.log(req.body.userName)
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

//get by id
router.get('/search/:id', (req,res,next) => {
    User.findByid(req.params.id).then(user => res.status(200).json( user));
})

//follow user
router.post('/:userId/following/:id', async (req, res,next) =>{
    const user = await User.findById(req.params.userId)
    const followUser = await User.findById(req.params.id);
    if(!user) res.status(400).json({status: false, msg: "No user found"})
    if(!followUser) res.status(400).json({status: false, msg: "No user to follow"})
    if(user._id.equals( followUser._id)) res.status(400).json({status: false, msg: "Cannot follow yourself"})
    if(user.following.indexOf(req.params.id) === -1 ){
        user.following.push(req.params.id);
        user.save()
        res.status(200).json({
            status: true, 
            msg: "User followed"
        })
    } else {
        res.status(400).json({status: false, msg: "Error"})
    }
});

router.get('/:userId/following', async (req, res, next)=>{
    const user = await User.findById(req.params.userId)
    if(!user) res.status(400).json({status: false, msg: "No user found"});
    else res.status(200).json(user.following)
});

router.delete('/delete/:userId', async (req, res, next) => {
    const user = await User.findById(req.params.userId)
    if(!user) res.status(400).json({status: false, msg: "Usere can't be found"})
    else {
        await User.deleteOne({_id: req.params.userId})
        res.status(200).json({status:true, msg: "Item deleted"});}
});
export default router;