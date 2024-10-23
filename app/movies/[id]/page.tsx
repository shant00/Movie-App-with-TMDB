import MovieCard from '@/components/MovieCard';
import { Key } from 'react';
import { fetchMovieCredits, fetchMovieDetails, fetchMovieRecommendations } from '../../../lib/api';

interface Params {
    id: string;
}

const MovieDetailsPage = async ({ params }: { params: Params }) => {
    const { id } = params;
    const movieId = Number(id);
    const movie = await fetchMovieDetails(movieId);
    const credits = await fetchMovieCredits(movieId);
    const recommendations = await fetchMovieRecommendations(movieId);

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <h3>Cast:</h3>
            <ul>
                {credits.map((actor: { id: Key; name: string }) => (
                    <li key={actor.id}>{actor.name}</li>
                ))}
            </ul>
            <h3>Recommendations:</h3>
            <div className="recommendations">
                {recommendations.map((rec: { id: Key | null | undefined; }) => (
                    <MovieCard key={rec.id} movie={rec} />
                ))}
            </div>
        </div>
    );
};

export default MovieDetailsPage;
