import { z } from 'zod';

// Zod schema for movie API response validation
export const movieSchema = z.object({
    id: z.number(),
    title: z.string(),
    overview: z.string().nullable(),
    poster_path: z.string().nullable(),
    release_date: z.string().nullable(),
    genres: z.array(z.object({ id: z.number(), name: z.string() })).optional(),
});

export const moviesListSchema = z.object({
    page: z.number(),
    results: z.array(movieSchema),
});
