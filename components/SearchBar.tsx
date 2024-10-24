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
                {...register('query')}
                placeholder="Search movies..."
                className="border p-2 rounded-l-lg"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">
                Search
            </button>
            {errors.query && <p className="text-red-500">{errors.query.message}</p>}
        </form>
    );
};

export default SearchBar;
