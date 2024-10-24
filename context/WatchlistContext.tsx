// context/WatchlistContext.tsx
"use client";
import { useWatchlist } from '@/hooks/useWatchlist';
import { Movie } from '@/types/movieTypes';
import { createContext, useContext, useEffect } from 'react';


interface WatchlistContextType {
    watchlist: Movie[];
    addToWatchlist: (movie: Movie) => void;
    removeFromWatchlist: (id: number) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

    // Load watchlist from localStorage on initial render
    useEffect(() => {
        const storedWatchlist = localStorage.getItem('watchlist');
        if (storedWatchlist) {
            JSON.parse(storedWatchlist).forEach((movie: Movie) => addToWatchlist(movie));
        }
    }, [addToWatchlist]);

    // Save watchlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

// Custom hook to use the Watchlist context
export const useWatchlistContext = () => {
    const context = useContext(WatchlistContext);
    if (!context) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return context;
};
