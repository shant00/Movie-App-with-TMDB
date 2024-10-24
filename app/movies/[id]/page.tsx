// app/movies/[id]/page.tsx
// app/movies/[id]/page.tsx
"use client"
import { fetchMovieDetails, fetchRecommendations } from '@/lib/api';
import { Movie } from '@/types/movieTypes';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

const MovieDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id: movieId } = use(params);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [recommendations, setRecommendations] = useState<Movie[]>([]);
    useEffect(() => {
        const fetchMovie = async () => {
            const movieData = await fetchMovieDetails(movieId);
            setMovie(movieData);
        };

        const fetchRecommendationsMovie = async () => {
            const response = await fetchRecommendations(movieId)
            setRecommendations(response.results);
        };

        fetchMovie();
        fetchRecommendationsMovie();
    }, [movieId]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={70} height={60} />
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Genres: {movie.genres ? movie.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>

            <h2 className="text-2xl font-semibold mt-4">Recommended Movies</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {recommendations.map((recommendedMovie) => (
                    <div key={recommendedMovie.id} className="border rounded-lg overflow-hidden shadow-lg">
                        <Link href={`/movies/${recommendedMovie.id}`}>
                            <Image src={`https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path}`} alt={recommendedMovie.title} className="w-full h-72 object-cover" width={70} height={60} />
                            <div className="p-4">
                                <h3 className="text-lg font-bold">{recommendedMovie.title}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieDetailsPage;
