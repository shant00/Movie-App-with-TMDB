import { Movie } from '@/types/movieTypes';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fetchMovies, fetchPopularMovies } from '../lib/api';
import MovieCard from './MovieCard';

interface MovieListProps {
    query: string;
}

const MovieList: React.FC<MovieListProps> = ({ query = '' }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastMovieElementRef = useRef<HTMLDivElement | null>(null);

    const loadMovies = async () => {
        setLoading(true);
        try {
            const data = query ? await fetchMovies(query, page) : await fetchPopularMovies(page);
            if (page === 1) {
                setMovies(data.results);
            } else {
                setMovies((prev) => [...prev, ...data.results]);
            }
            setHasMore(data.results.length > 0);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, query]);

    useEffect(() => {
        setPage(1);
    }, [query]);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && hasMore && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        },
        [hasMore, loading]
    );

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '200px',
            threshold: 0,
        });

        if (lastMovieElementRef.current) {
            observerRef.current.observe(lastMovieElementRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [movies, handleObserver]);

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                {movies.map((movie, index) => (
                    <div
                        key={`${movie.id}-${Math.random()}`}
                        ref={index === movies.length - 1 ? lastMovieElementRef : null}
                    >
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default MovieList;
