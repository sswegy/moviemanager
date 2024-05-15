import { app } from '@azure/functions';
import sql from 'mssql';
import dbconfig from '../database/DBConfig.js';


app.http('SearchMovieByTitle', {
    methods: ['GET'],
    route: 'SearchMovieByTitle/{title?}',
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Processing search request...`);

        try {
            const title = request.params.title;
            
            let moviesQuery = 'SELECT * FROM Movies';
            let reviewsQuery = 'SELECT Movies.title, Reviews.rating, Reviews.review_text FROM Movies LEFT JOIN Reviews ON Movies.id = Reviews.movie_id WHERE';
            if (title) {
                moviesQuery += ` WHERE title LIKE '${title}'`;
                reviewsQuery += ` Movies.title = '${title}' AND` ;
            }
            reviewsQuery += ' (Reviews.review_text IS NOT NULL OR Reviews.rating IS NOT NULL)';
            
            await sql.connect(dbconfig);
            
            const movies = await sql.query(moviesQuery);
            const reviews = await sql.query(reviewsQuery);
            
            await sql.close();
            return { status: 200, body: JSON.stringify({ movies: movies.recordset, reviews: reviews.recordset }) };
        } catch (error) {
            console.log('Error processing search request:', error);
            return { status: 500, body: `Error processing search request: ${error.message}` };
        }
    }
});