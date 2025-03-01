import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const profileRouter = express.Router();

profileRouter.get('/profile', authenticateToken, (req, res) => {
    res.json({ 
        message: 'Acceso autorizado', 
        user: req.user 
    });
});

export default profileRouter; 
