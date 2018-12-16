# AsynchronousServer
## Introduction
This is a projet where we implemented a web API allowing us to CRUD a user whith a front interface
## Instructions d'installations
Install nodeJS : https://nodejs.org/en/download/ <br/>
Launch a terminal shell in the folder and run the instructions bellow : <br/>
`npm install` <br/>
Then to populate the data base you could do : <br/>
`npm run populate` <br/>
You may then run the tests : <br/>
`npm test` <br/>
To finish and start the app :
`npm run dev`
## Usage instruction
Launch your browser and go to the URL `http://localhost:8080/` <br/>
To signup : `http://localhost:8080/signup` and enter credentials to create an account <br/>
Login : `http://localhost:8080/login` There is a probleme I could'nt understand with the "get" in the database <br/>
Post new metrics : <br/>
`PUT localhost:8080/metrics/:id` <br/>
`{"timestamp":"yourtimestamp", "value":"yourvalue"}` <br/>
## Contributeur
Benoit Chaurand