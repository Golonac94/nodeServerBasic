import { OAuth2Client } from 'google-auth-library';
import { validateUser } from '../schemas/user.js'
import { findUserByEmail, registerGoogleUser,registerAppleUser, loginUser, registerUser, deleteUser } from '../models/login.js';
import { generateAccessToken,generateRefreshToken } from '../utils/jwt.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(400).json({ message: 'Token de Google requerido' });

        // Verificar el token con Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload.email;
        const username = payload.name;

        let user = await findUserByEmail(email);

        if (!user) {

            await registerGoogleUser(username, email)
            ;
            res.status(201).json({ message: 'Usuario registrado exitosamente con Google' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const appleAuth = async (req, res) => { 

}

export const googleRegister = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(400).json({ message: 'Token de Google requerido' });

        // Verificar el token con Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload.email;
        const username = payload.name;

        let user = await findUserByEmail(email);

        if (user) {
            return res.status(409).json({ message: 'El usuario ya está registrado, inicia sesión' });
        }

        await registerGoogleUser(username, email);
        res.status(201).json({ message: 'Usuario registrado exitosamente con Google' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
       
        const result = await loginUser(email, password);

        if (!result.success) {
            return res.status(401).json({ message: result.message }); 
        }
        const accessToken = generateAccessToken(result.user);
        const refreshToken = generateRefreshToken(result.user);
        
        res.status(200).json({ message: 'Login exitoso', user: result.user, 
             accessToken ,refreshToken  });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const register = async (req, res) => {
    try {
        const validationResult = validateUser(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ errors: validationResult.error.format() });
        }

        const { username, email, password, provider,phone, role_id } = validationResult.data;
        const result = await registerUser(username, email, password, provider,phone, role_id);
        if (!result.success) {
            return res.status(400).json({ message: result.message }); 
        }

        const accessToken = generateAccessToken(result.user);
        const refreshToken = generateRefreshToken(result.user);
        
        res.status(201).json({ message: 'Registro exitoso', user: result.user, accessToken ,refreshToken  }); 

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export const removeUser = async (req, res) => {
    try {
        const { email } = req.body;  //revisar si lo hacemos por Email o codigo de usuario
        if (!email) return res.status(400).json({ message: 'Email es obligatorio para eliminar un usuario' });

        let user = await findUserByEmail(email);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        await deleteUser(email);
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
