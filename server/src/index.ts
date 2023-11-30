import * as express from 'express';
import * as cors from 'cors';
import { defaultController } from './controllers/defaultController';
import { jobsController } from './controllers/jobsController';


const server = express();
const port = 8080;

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


// routes
server.use('/jobs', jobsController());
server.use('/', defaultController());


server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});



