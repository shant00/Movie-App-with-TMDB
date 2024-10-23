import { useEffect, useState } from 'react';
import { fetchPopularMovies, searchMovies } from '../lib/api';

export const useMovies = (searchQuery: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [movies, setMovies] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const fetchedMovies = searchQuery
                    ? await searchMovies(searchQuery, page)
                    : await fetchPopularMovies(page);
                setMovies((prev) => [...prev, ...fetchedMovies]);
                setHasMore(fetchedMovies.length > 0);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [searchQuery, page]);

    return { movies, loading, hasMore, setPage };
};
