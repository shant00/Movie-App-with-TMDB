//hook/useWatchlist.ts

import { create } from 'zustand';
import { Movie } from '../types/movieTypes';

interface WatchlistState {
    watchlist: Movie[];
    addToWatchlist: (movie: Movie) => void;
    removeFromWatchlist: (id: number) => void;
}

export const useWatchlist = create<WatchlistState>((set) => ({
    watchlist: [],
    addToWatchlist: (movie) => set((state) => ({ watchlist: [...state.watchlist, movie] })),
    removeFromWatchlist: (id) =>
        set((state) => ({ watchlist: state.watchlist.filter((movie) => movie.id !== id) })),
}));
