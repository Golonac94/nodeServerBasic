import express from 'express';  
import dotenv from 'dotenv';
import loginRouter from './routes/login.js';   
import profileRouter from './routes/profile.js';  
import { corsMiddleware } from './middlewares/cors.js'

dotenv.config();

const app = express();
app.use(corsMiddleware()) 
app.disable('x-powered-by');
app.use(express.json());  


app.use('/auth', loginRouter);

app.use('/protected', profileRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//comentario de prueba