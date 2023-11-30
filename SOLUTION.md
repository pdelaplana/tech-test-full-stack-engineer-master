hipages Solution
===========================

## About 
Solution consists of the folloiwng projects

### Frontend 
The frontend SPA application has been built using Ionic Framework 7 in React.  

I decided to use the Ionic Framework sincce it provided a rich set of components that closely meets the UI requirements as describe for this solution.  Morever, its mobile first approach provies flexiibility to compile to both IOS and Android apps as well as configure and deploy as a PWA.  Being able to run it on the web browser is an added bonus.        


### Backend
The backend server is built using  NodeJS / ExpressJS.  

To promote seperation of concerns, I added a middleware (expressjs) application that implements endpoint handlers to handle client requests.  This allows me to seperate concerns so that each middleware controller can in the future ne build to servce a specific domain (i.e categories and suburbs).  Also, I have made use of the CQRS pattern for data access.  

  


## Running the Solution
The simplest way to run the full solution is through docker.

``` console

// assuming you are in solution root in tech-test-full-stack-engineer-master 

docker compose up -d

```

The backend server will be running on http://localhost:8080.  

The frontend SPA will be available on http://localhost:8100.  Note that the Ionic SPA is served on a development server via `ionic serve`.



