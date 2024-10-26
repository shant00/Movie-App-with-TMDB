
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const USER_CREDENTIALS = {
    username: 'admin@admin.com',
    password: 'Admin@123',
};




export async function POST(request: Request) {
    const { username, password } = await request.json();
    if (username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY || '1h' });
        return NextResponse.json({ message: 'Login successful', token, }, {
            headers: {
                'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=3600`,
            },
        });
    } else {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
}

export async function DELETE() {
    return NextResponse.json({ message: 'Logout successful' }, {
        headers: {
            'Set-Cookie': 'token=; HttpOnly; Path=/; Max-Age=0',
        },
    });
}


