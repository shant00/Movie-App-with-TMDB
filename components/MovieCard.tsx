import { useWatchlist } from '@/hooks/useWatchlist';
import { Movie } from '@/types/movieTypes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
    const router = useRouter();

    const isInWatchlist = watchlist.some((item) => item.id === movie.id);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch('/api/auth', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json();
                const token = data?.token;
                setIsAuthenticated(!!token);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        checkAuthentication();
    }, []);

    const handleWatchlistClick = () => {
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }

        if (isInWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };
    return (
        <div className="border rounded-lg p-4">
            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={500} height={720} className="w-full h-72 object-cover" />

            <div className="p-4">
                <h2 className="text-lg font-bold">{movie.title}</h2>
                <div className="flex justify-between items-center">
                    <Link href={`/movies/${movie.id}`}>
                        <button className="bg-blue-500 text-white p-2 rounded-md">View Details</button>
                    </Link>
                    <button
                        className={`p-2 rounded-lg mt-2 ${isAuthenticated && isInWatchlist ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                        onClick={handleWatchlistClick}
                    >
                        {isAuthenticated && isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
