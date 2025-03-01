import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET ;
const REFRESH_SECRET = process.env.REFRESH_SECRET ;

export function generateAccessToken(user) {
    return jwt.sign(
        { id: user.id,provider: user.provider, email: user.email, role: user.role_id }, 
        SECRET_KEY, 
        { expiresIn: '1h' } // Expira en 1 hora
    );
}

export function generateRefreshToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        REFRESH_SECRET,
        { expiresIn: '7d' }  
    );
}


export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}

export function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, REFRESH_SECRET);
    } catch (error) {
        return null;
    }
}

export default {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};