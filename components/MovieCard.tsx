// components/MovieCard.tsx
import { useWatchlist } from '@/hooks/useWatchlist';
import { Movie } from '@/types/movieTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

    // Check if the movie is already in the watchlist
    const isInWatchlist = watchlist.some((item) => item.id === movie.id);

    return (
        <div className="border rounded-lg p-4">
            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={500} height={720} className="w-full h-72 object-cover" />

            <div className="p-4">
                <h2 className="text-lg font-bold">{movie.title}</h2>
                <div className="flex justify-between items-center">
                    <Link href={`/movies/${movie.id}`}>
                        <button className="bg-blue-500 text-white p-2 rounded-md">View Details</button>
                    </Link>
                    {isInWatchlist ? (
                        <button
                            className="bg-red-500 text-white p-2 rounded-lg mt-2"
                            onClick={() => removeFromWatchlist(movie.id)}
                        >
                            Remove from Watchlist
                        </button>
                    ) : (
                        <button
                            className="bg-blue-500 text-white p-2 rounded-lg mt-2"
                            onClick={() => addToWatchlist(movie)}
                        >
                            Add to Watchlist
                        </button>)}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
