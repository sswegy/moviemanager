import { app } from '@azure/functions';
import sql from 'mssql';


app.timer('SetAvgRating', {
    schedule: '0 30 11 * * *',
    handler: async (myTimer, context) => {
        try {
            console.log('Timer trigger function ran!', new Date().toISOString());

            await sql.connect(config);

            await sql.query(`UPDATE Movies SET avg_rating = (SELECT AVG(rating) FROM Reviews WHERE movie_id = Movies.id)`);

            await sql.close();
            console.log('Average ratings calculated and updated successfully.');
        } catch (error) {
            console.log('Error in timer trigger function:', error);
        }
    }
})