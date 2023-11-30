import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { loggerService } from '../../services/loggerService';
import { createConnection } from '../createConnection';
import { buildUpdateFields } from '../helpers/buildUpdateFields';
import { getJobsQuery } from '../queries/getJobsQuery';
import { mapKeyValues } from '../../controllers/helpers/mapKeyValues';

export const updateJobCommand = async (updateFieldsMap: Map<string,any>, jobId: number) => {

    const [updateFields, updateValues] = buildUpdateFields(updateFieldsMap);

    const statement = `
        UPDATE jobs SET ${updateFields} WHERE id = ?
    `; 

    const connection = await createConnection();
    try {
        connection.connect();    
        const [results, fields] = await connection.execute(statement, [...updateValues, jobId]);  
        
        // return the job that has been updated if successful
        if ((results as ResultSetHeader).affectedRows > 0) {
            const job = getJobsQuery(mapKeyValues({'jobs.id': jobId}));
            return job;
        }
        return null;
    
    } catch (e) {
        loggerService.error('updateJobCommand',e)
    } finally {
        connection.end();
    }

}