"use client"
import { fetchCast, fetchMovieDetails, fetchRecommendations } from '@/lib/api';
import { Movie } from '@/types/movieTypes';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

const MovieDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id: movieId } = use(params);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [cast, setCast] = useState<{ id: number; profile_path: string; name: string }[]>([]);
    const [recommendations, setRecommendations] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovie = async () => {
            const movieData = await fetchMovieDetails(movieId);
            setMovie(movieData);
        };
        const fetchCastDetails = async () => {
            const response = await fetchCast(movieId);
            setCast(response.cast);
        };

        const fetchRecommendationsMovie = async () => {
            const response = await fetchRecommendations(movieId);
            setRecommendations(response.results);
        };

        fetchMovie();
        fetchCastDetails();
        fetchRecommendationsMovie();
    }, [movieId]);

    if (!movie) return (<div>Loading...</div>);
    const formatReleaseDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">{movie.title}</h1>

                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="rounded-lg my-4 shadow-lg object-cover h-[50vh]"
                />

                <div className="text-gray-800 dark:text-gray-300 space-y-2 text-center">
                    <p className="text-lg">{movie.overview}</p>
                    <p><span className="font-semibold">Release Date:</span> {movie.release_date ? formatReleaseDate(movie.release_date) : 'N/A'}</p>
                    <p>
                        <span className="font-semibold">Genres: </span>
                        {movie.genres ? movie.genres.map(genre => genre.name).join(', ') : 'N/A'}
                    </p>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mt-8 text-gray-900 dark:text-gray-100">Cast</h2>
            <div className="flex overflow-x-auto mt-4 space-x-4">
                {cast.length > 0 ? (
                    cast.map((member: { id: number; profile_path: string; name: string }) => (
                        <div key={member.id} className="border dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                                alt={member.name}
                                className="w-32 h-32 object-cover"
                                width={200}
                                height={200}
                            />
                            <div className="p-2">
                                <p className="text-sm  text-gray-900 dark:text-gray-100">{member.name}</p>

                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No cast information available.</p>
                )}
            </div>

            <h2 className="text-2xl font-semibold mt-8 text-gray-900 dark:text-gray-100">Recommended Movies</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4">
                {recommendations.map((recommendedMovie) => (
                    <div key={recommendedMovie.id} className="border dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition duration-200">
                        <Link href={`/movies/${recommendedMovie.id}`}>
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path}`}
                                alt={recommendedMovie.title}
                                className="w-full h-72 object-cover"
                                width={300}
                                height={450}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{recommendedMovie.title}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieDetailsPage;
