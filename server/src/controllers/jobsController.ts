import * as express from 'express';
import { getJobsQuery } from '../database/queries/getJobsQuery';
import { loggerService } from '../services/loggerService';
import { mapKeyValues } from './helpers/mapKeyValues';
import { updateJobCommand } from '../database/commands/updateJobCommand';

export const jobsController =  () => {
  const endpoint = express();

  endpoint.get('/', async (request, response)=> {
    loggerService.info('[GET] /jobs', { url: request.originalUrl });

    const searchFilters = mapKeyValues(request.query);
    const results = await getJobsQuery(searchFilters);
    response.status(200).send(results)
  });

  endpoint.patch('/:jobId', async (request, response) =>{
    loggerService.info('[PATCH] /jobs', { url: request.originalUrl, body: request.body });
    
    const jobId = parseInt(request.params.jobId);
    const updateFields = mapKeyValues(request.body);
    const results = await updateJobCommand(updateFields,jobId);
    
    response.status(200).send(results);

  })

  return endpoint;
}