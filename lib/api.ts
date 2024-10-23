import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Ensure to set your TMDB API Key in .env

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

export const fetchPopularMovies = async (page: number) => {
    const { data } = await api.get(`/movie/popular?api_key=${API_KEY}&page=${page}`);
    return data.results;
};

export const searchMovies = async (query: string, page: number) => {
    const { data } = await api.get(`/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    return data.results;
};

export const fetchMovieDetails = async (id: number) => {
    const { data } = await api.get(`/movie/${id}?api_key=${API_KEY}`);
    return data;
};

export const fetchMovieCredits = async (id: number) => {
    const { data } = await api.get(`/movie/${id}/credits?api_key=${API_KEY}`);
    return data.cast;
};

export const fetchMovieRecommendations = async (id: number) => {
    const { data } = await api.get(`/movie/${id}/recommendations?api_key=${API_KEY}`);
    return data.results;
};
