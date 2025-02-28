import express from 'express';  
import dotenv from 'dotenv';
import loginRouter from './routes/login.js';   

dotenv.config();

const app = express();
app.disable('x-powered-by');
app.use(express.json());  
app.use('/login', loginRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//comentario de prueba