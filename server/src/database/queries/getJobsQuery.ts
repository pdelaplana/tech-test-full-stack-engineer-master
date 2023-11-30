
import { loggerService } from '../../services/loggerService';
import { createConnection } from '../createConnection';
import { buildWhereClause } from '../helpers/buildWhereClause';

export const getJobsQuery = async (filterFields: Map<string,any> = null, offset: number = 0, limit: number = 50) => {

    const {whereClause, values} = buildWhereClause(filterFields);

    const query = `
        SELECT jobs.*, categories.name as category, suburbs.name as suburb, suburbs.postcode  
        FROM jobs
        LEFT JOIN categories on categories.id = jobs.category_id
        LEFT JOIN suburbs on suburbs.id = jobs.suburb_id
        ${whereClause} LIMIT ?, ?
    `; 

    const connection = await createConnection();
  
    try {
        connection.connect();
        const [results, fields] = await connection.execute(query, [...values, offset, limit]);
        return results;
    } catch (e) {
        loggerService.error('getJobsQuery',e)
    } finally {
        connection.end();
    }   
}