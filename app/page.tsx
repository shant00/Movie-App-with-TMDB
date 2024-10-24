'use client';
import MovieList from '@/components/MovieList';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';


const HomePage = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={setQuery} />
      <MovieList query={query || 'popular'} />
    </div>
  );
};

export default HomePage;
