"use client";
import MovieCard from '@/components/MovieCard';
import { useWatchlist } from '@/hooks/useWatchlist';

import React from 'react';

const WatchlistPage: React.FC = () => {
    const { watchlist } = useWatchlist();

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">Watchlist</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {watchlist.length > 0 ? (
                    watchlist.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p className="text-gray-600 dark:text-gray-300">No movies in your watchlist.</p>
                )}
            </div>
        </div>

    );
};

export default WatchlistPage;
