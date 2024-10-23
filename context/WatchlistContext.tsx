'use client'

import { createContext, ReactNode, useContext } from 'react';
import { useWatchlist } from '../hooks/useWatchlist';
const WatchlistContext = createContext<ReturnType<typeof useWatchlist> | null>(null);



export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
    const watchlistStore = useWatchlist();
    return (
        <WatchlistContext.Provider value={watchlistStore}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlistContext = () => {
    return useContext(WatchlistContext);
};
