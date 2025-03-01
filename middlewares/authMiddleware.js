import { verifyAccessToken } from '../utils/jwt.js';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    
    if (!decoded) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    req.user = decoded;  
    next();  
}
