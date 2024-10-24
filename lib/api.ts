import axiosInstance from './axiosInstance';
import { movieSchema, moviesListSchema } from './zodSchemas';


// Fetch movies list by search query
export const fetchMovies = async (query: string, page: number = 1) => {
    console.log(query);
    const response = await axiosInstance.get('/search/movie', {
        params: { query, page },
    });
    const validatedData = moviesListSchema.parse(response.data);
    return validatedData;
};

// Fetch popular movies (for default load)
export const fetchPopularMovies = async (page: number = 1) => {
    const response = await axiosInstance.get('/movie/popular', {
        params: { page },
    });
    const validatedData = moviesListSchema.parse(response.data);
    return validatedData;
};

// Fetch movie details by ID
export const fetchMovieDetails = async (id: string) => {
    const response = await axiosInstance.get(`/movie/${id}`);
    const validatedData = movieSchema.parse(response.data);
    return validatedData;
};


//fetch recommendations movies 
export const fetchRecommendations = async (id: string) => {
    const response = await axiosInstance.get(`/movie/${id}/recommendations`);
    const validatedData = moviesListSchema.parse(response.data);
    return validatedData;
};