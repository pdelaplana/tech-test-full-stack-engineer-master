hipages Full Stack Technical Interview Solution
================================================

## About 
This fullstack solution has been built as part of hipages full stack engineer technical interview process.  It is comprised of the following projects:

### Frontend 
The frontend SPA application has been built using Ionic Framework 7 in React.  The source code can be found in `./ui/LeadManagementSPA`.

I chose the Ionic Framework since it provided a rich set of components that closely met the UI requirements for this solution.  Morever, its cross-platform approach allows the same codebase to be compiled to both IOS and Android as well as deploy as a PWA. This means we can quickly pivot to delivering native applications or a PWA in future iterations.  Being able to run it on the web browser is a definite bonus.       


### Backend
The backend server is built using NodeJS / ExpressJS.  The source code can be found in `./server`

To promote seperation of concerns and future extensibility, I opted to architect the backend as a middleware (expressjs) application (ie `jobsController`) that implements endpoint handlers for client http requests.  Additional middleware applications can be added in the future for specific domain objects such as categories and suburbs.  Also, I have made use of the CQRS pattern to abstract data access to the MySQL database.  

## Future and Additional Work 
The following outlines additional work required to make this a potential candidate for a production release.

### Unit Testing
A very small number of Jest/RTL unit tests have been included for the frontend but further work is needed to increase the test coverage.  

### Integration and E2E Testing
No integration or E2E tests have been included.  We can use Cypress or Selenium to build these tests and eventually run them as part of a ci/cd pipeline.  

### Static Code Analysis and Formatters 
Static code analysis tools such as `eslint` and code formatters such as `prettier` and `editorconfig` are needed to enforce consistency and convention. 

### Secrets
Development secrets are currently kept in .env files and committed in the repo.  For now, this is acceptable as these are used for the MYSQL docker containers but for prod builds, all secrets need to be secured in a vault service. 

### Application Improvements

#### Authentication
As of now, the solution is not secured via authentication.  We can choose a number of 3rd party auth providers such as auth0, okta, gcp, aws or azure in the future to secure the solution.  

#### Pagination
Pagination features are built-in to the backend server.  However, the frontend is not currently making use of this but quick change to the api call to include these params can be easily made. 

e.g.

```
http:\\localhost:8080\jobs?offsett=0&limit=50
```

## Running the Solution
The simplest way to run the full solution is through docker.

``` console

// assuming you are in solution root in tech-test-full-stack-engineer-master 

docker compose up -d

```

This will create and run three containers for the Ionic ui, NodeJS server and MySQL database respectively.  

Once all containers are up and running, you should be able to reach the ui and server at the following urls:

* backend: http://localhost:8080
* frontend: http://localhost:8100

Note that the frontend is serving a development build only via `ionic serve`.



