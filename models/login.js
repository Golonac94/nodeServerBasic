import pool from './db.js';
import bcrypt from 'bcrypt';

export async function findUserByEmail(email) {
    try {
        const sql = `SELECT BIN_TO_UUID(id) as id, username, email, password, provider, role_id FROM users WHERE email = ?`;
        const [rows] = await pool.query(sql, [email]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        throw new Error(error.message);
    }
}

//login

export async function loginUser(email, password) {   //para registro normal
    try {
        const user = await findUserByEmail(email);
        if (!user) return { success: false, message: 'Usuario no encontrado' };

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return { success: false, message: 'Contraseña incorrecta' };

        return { success: true, user };

    } catch (error) {
        throw new Error(error.message);
    }
}

//registros

export async function registerUser(username, email, password, provider, role_id) { //para registro normal
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO users (id, username, email, password, provider, role_id) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?)`;
        await pool.query(sql, [username, email, hashedPassword, provider, role_id]);
        const user = await findUserByEmail(email);  
        return { success: true, user };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return { success: false, message: 'El usuario ya está registrado' };
        }
        return { success: false, message: error.message }; 
    }
}

export async function registerGoogleUser(username, email) { //para registro google
    try {
        const sql = `INSERT INTO users (id, username, email, password, provider, role_id) 
                     VALUES (UUID_TO_BIN(UUID()), ?, ?, NULL, 'google', 1)`;
        const [result] = await pool.query(sql, [username, email]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}


//borrado

export async function deleteUser(email) {
    const sql = `DELETE FROM users WHERE email = UUID_TO_BIN(?)`;
    return await pool.query(sql, [email]);
}