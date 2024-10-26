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
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
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
        <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-lg transition duration-300">
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={720}
                className="w-full h-72 object-cover rounded-md"
            />

            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">{movie.title}</h2>
                <div className="flex justify-between items-center mt-4">
                    <Link href={`/movies/${movie.id}`}>
                        <button className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition mr-2">
                            View Details
                        </button>
                    </Link>
                    <button
                        className={`px-4 py-2 rounded-md transition ${isAuthenticated && isInWatchlist
                            ? 'bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700'
                            : 'bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700'
                            } text-white`}
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
