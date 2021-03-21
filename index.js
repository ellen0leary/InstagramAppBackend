import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import './db.js'
import {loadUsers} from './seedData/index.js'
import userRouter from './api/user/index.js';
// import session from 'express-session';
// import passport from './authenicate';

dotenv.config();
const app = express();

// app.get('/', (req, res) => res.send('Hello world'));

const port =  8082;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(passport.initialize());
// app.use(session({
//   secret: "ilikecake",
//   resave : true,
//   saveUninitialized : true
// }));

if(process.env.SEED_DB){
    loadUsers()
}

app.use('/api/user',userRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));

//user
//post - userId
//comment - postId