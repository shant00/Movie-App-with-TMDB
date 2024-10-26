import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import * as z from 'zod';

const searchSchema = z.object({
    query: z.string().min(1, 'Search query must be at least 1 character'),
});

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ query: string }>({
        resolver: zodResolver(searchSchema),
    });

    const onSubmit = (data: { query: string }) => {
        onSearch(data.query);
        console.log(data.query);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4 flex">
            <input
                {...register('query', { required: 'Search query is required' })}
                placeholder="Search movies..."
                className="border p-2 rounded-l-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition duration-200">
                Search
            </button>
            {errors.query && <p className="text-red-500 mt-2">{errors.query.message}</p>}
        </form>
    );
};

export default SearchBar;
