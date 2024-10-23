import { create } from 'zustand';

type WatchlistStore = {
    watchlist: number[];
    addToWatchlist: (id: number) => void;
    removeFromWatchlist: (id: number) => void;
};

export const useWatchlist = create<WatchlistStore>((set) => ({
    watchlist: [],
    addToWatchlist: (id) => set((state) => ({ watchlist: [...state.watchlist, id] })),
    removeFromWatchlist: (id) => set((state) => ({ watchlist: state.watchlist.filter((movieId) => movieId !== id) })),
}));
