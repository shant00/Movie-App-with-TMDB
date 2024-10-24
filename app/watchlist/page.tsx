// watchlist/page.tsx
"use client";
import MovieCard from '@/components/MovieCard';
import { useWatchlist } from '@/hooks/useWatchlist';

import React from 'react';

const WatchlistPage: React.FC = () => {
    const { watchlist } = useWatchlist(); // Use Zustand directly

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Your Watchlist</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                {watchlist.length > 0 ? (
                    watchlist.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p>No movies in your watchlist.</p>
                )}
            </div>
        </div>
    );
};

export default WatchlistPage;
