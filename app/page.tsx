'use client';
import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';
import { useMovies } from '../hooks/useMovies';


const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { movies, loading, hasMore, setPage } = useMovies(searchQuery) as { movies: { id: string }[], loading: boolean, hasMore: boolean, setPage: (page: number) => void };
  const [currentPage, setCurrentPage] = useState(1);

  const loadMore = () => {
    if (hasMore) {
      const nextPage = currentPage + 1;
      setPage(nextPage);
      setCurrentPage(nextPage);
    }
  };

  return (
    <div>
      <SearchBar setSearchQuery={setSearchQuery} />
      <div className="movies-list">
        {movies.map((movie) => (
          <MovieCard key={movie?.id} movie={movie} />
        ))}
      </div>
      {loading && <Spinner />}
      {hasMore && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default HomePage;
