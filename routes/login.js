import express from 'express';
import { 
    googleAuth, 
    appleAuth, 
    login, 
    register, 
    removeUser 
} from '../controllers/login.js';

import { refreshAccessToken } from '../controllers/refreshToken.js';


const loginRouter = express.Router();

loginRouter.post('/google/login', googleAuth);   //ME FALTA TESTEAR
loginRouter.post('/apple/login', appleAuth);   //ME FALTA TESTEAR

loginRouter.post('/login', login); //LOGIN
loginRouter.post('/register', register); //REGISTRO
// ME FALTA EL CERRAR SESION 
loginRouter.delete('/refresh', refreshAccessToken); // LO TENGO LISTO
loginRouter.delete('/remove', removeUser);  // NO LO HE TESTEADO

export default loginRouter; 
