import Image from 'next/image';
import { useWatchlistContext } from '../context/WatchlistContext';

const MovieCard = ({ movie }) => {
    const { addToWatchlist, removeFromWatchlist, watchlist } = useWatchlistContext();
    const isInWatchlist = watchlist.includes(movie.id);

    const handleWatchlistToggle = () => {
        if (isInWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie.id);
        }
    };

    return (
        <div className="movie-card">
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className="rounded"
            />
            <h3>{movie.title}</h3>
            <button onClick={handleWatchlistToggle}>
                {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
        </div>
    );
};

export default MovieCard;
