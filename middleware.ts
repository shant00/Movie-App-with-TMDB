import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token');
    const verified = token && verifyToken(token.value);
    console.log('Token:', token);
    console.log('Verified:', verified);
    console.log('Request Path:', req.nextUrl.pathname);

    if (!verified && req.nextUrl.pathname.startsWith('/watchlist')) {


        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/watchlist'],
};
