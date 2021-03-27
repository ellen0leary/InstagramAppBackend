import express from 'express';
import Post from './postModel.js';
import User from '../user/userModel.js';

const router = express.Router();

//gets all posts
router.get('/', (req,res,next) =>{
    Post.find().then(post => res.status(201).json(post)).catch(next);
});

//create post
router.post('/', (req,res,next) => {
    Post.create()
});

//find posts by user
router.get('/:userId', (req,res, next) => {
    Post.findByUserId(req.params.userId).then(post => res.status(201).json(post)).catch(next);
});


//serachs for a sephic user
router.get('/search/:id', (req,res, next) => {
    console.log(req.params.id)
    Post.findByid(req.params.id).then(post =>res.status(201).json(post)).catch(next);
});


export default router;