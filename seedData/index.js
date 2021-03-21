import userModel from '../api/user/userModel.js';

import {users} from './user.js';

export async function loadUsers(){
    try {
        await userModel.deleteMany();
        await users.forEach(user => userModel.create(user));
        console.info(`${users.length} users were successfully stored.`);
      } catch (err) {
        console.error(`failed to Load user Data: ${err}`);
      }
}