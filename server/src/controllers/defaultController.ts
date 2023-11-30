import * as express from 'express';

export const defaultController =  () => {
  const endpoint = express();

  endpoint.get('/', (request, response)=> {
    response.status(200).send('Hello World')
  });

  return endpoint;
}