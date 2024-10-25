import { movieSchema } from '@/lib/zodSchemas';
import { Movie } from '@/types/movieTypes';
import { NextResponse } from 'next/server';

const watchlist: Movie[] = [];

export async function GET() {
    return NextResponse.json(watchlist);
}

export async function POST(req: Request) {
    const movie = await req.json();
    const parsedMovie = movieSchema.parse(movie);
    watchlist.push(parsedMovie);
    return NextResponse.json(parsedMovie);
}
