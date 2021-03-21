import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import './db.js'



dotenv.config();
const app = express();

app.get('/', (req, res) => res.send('ello world'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

//user
//post - userId
//comment - postId
