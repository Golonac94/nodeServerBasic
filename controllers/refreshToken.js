import jwtUtils from '../utils/jwt.js';

export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ message: 'Refresh Token requerido' });

        const decoded = jwtUtils.verifyRefreshToken(refreshToken);
        if (!decoded) return res.status(403).json({ message: 'Refresh Token inválido o expirado' });

        // ✅ Generar un nuevo Access Token
        const newAccessToken = jwtUtils.generateAccessToken(decoded);
        
        res.status(200).json({ accessToken: newAccessToken });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
