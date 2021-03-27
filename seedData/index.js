import userModel from '../api/user/userModel.js';
import postModel from '../api/post/postModel.js'

import {users} from './user.js';
import {posts} from './posts.js';

export async function loadUsers(){
    try {
        await userModel.deleteMany();
        await users.forEach(user => userModel.create(user));
        console.info(`${users.length} users were successfully stored.`);
      } catch (err) {
        console.error(`failed to Load user Data: ${err}`);
      }
}

export async function loadPosts(){
    try {
      await postModel.deleteMany();
      await posts.forEach(post => postModel.create(post));
      console.info(`${posts.length} users were successfully stored.`);
    } catch(err) {
      console.error(`failed to load post data: ${err}`)
    }
}