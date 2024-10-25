
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const USER_CREDENTIALS = {
    username: 'admin@admin.com',
    password: 'Admin@123',
};
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
export async function POST(request: Request) {
    const { username, password } = await request.json();
    if (username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return NextResponse.json({ message: 'Login successful' }, {
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


export async function GET(request: Request) {
    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
        const cookies = Object.fromEntries(cookieHeader.split('; ').map(cookie => {
            const [name, value] = cookie.split('=');
            return [name, decodeURIComponent(value)];
        }));
        const token = cookies['token'];
        return NextResponse.json({ token });
    }

    return NextResponse.json({ message: 'No cookies found' }, { status: 404 });
}