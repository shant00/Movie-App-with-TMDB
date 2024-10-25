import { jwtVerify } from 'jose';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

const HARD_CODED_USER = {
    username: 'admin',
    password: 'password123',
};

export const signToken = (payload: object) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = async (token: string) => {
    console.log(token, SECRET_KEY);
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
        return payload
    } catch (err) {
        console.log(err);
        return null;
    }
};


export const authenticateUser = (username: string, password: string) => {
    return username === HARD_CODED_USER.username && password === HARD_CODED_USER.password;
};

