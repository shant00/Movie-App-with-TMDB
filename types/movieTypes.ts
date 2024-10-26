
export interface Genre {
    id: number;
    name: string;
}


export interface Movie {
    id: number;
    title: string;
    overview: string | null;
    poster_path: string | null;
    release_date: string | null;
    genres?: { id: number; name: string }[];

}

export interface MoviesList {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
