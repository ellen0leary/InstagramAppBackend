import express from 'express';
import Post from './postModel.js';
import User from '../user/userModel.js';

const router = express.Router();

router.get('/', (req,res,next) =>{
    Post.find().then(post => res.status(201).json(post)).catch(next);
});

router.post('/', (req,res,next) => {
    
});

router.get('/:id', (req,res, next) => {

});

export default router;