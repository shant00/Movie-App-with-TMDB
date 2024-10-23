import MovieCard from '../../components/MovieCard';
import { useWatchlistContext } from '../../context/WatchlistContext';

const WatchlistPage = () => {
    const watchlistContext = useWatchlistContext();
    if (!watchlistContext) {
        return <div>Error: Watchlist context is not available.</div>;
    }
    const { watchlist }: { watchlist: string[] } = watchlistContext;

    return (
        <div>
            <h1>My Watchlist</h1>
            <div className="watchlist">
                {watchlist.map((id: string) => (
                    <MovieCard key={id} movie={{ id }} />
                ))}
            </div>
        </div>
    );
};

export default WatchlistPage;
