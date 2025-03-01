import express from 'express';
import { 
    googleAuth, 
    googleRegister, 
    login, 
    register, 
    removeUser 
} from '../controllers/login.js';

import { refreshAccessToken } from '../controllers/refreshToken.js';


const loginRouter = express.Router();

loginRouter.post('/google/login', googleAuth);
loginRouter.post('/google/register', googleRegister);
loginRouter.post('/login', login);
loginRouter.post('/register', register);
loginRouter.delete('/refresh', refreshAccessToken);
loginRouter.delete('/remove', removeUser);

export default loginRouter; 
