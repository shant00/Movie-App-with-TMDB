import { FieldValues, useForm } from 'react-hook-form';

interface SearchBarProps {
    setSearchQuery: (query: string) => void;
}

const SearchBar = ({ setSearchQuery }: SearchBarProps) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: FieldValues) => {
        const query = data.query as string;
        setSearchQuery(query);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="search-bar">
            <input
                type="text"
                placeholder="Search for a movie..."
                {...register('query', { required: true })}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
