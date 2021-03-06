// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
// Dependencies 
const bodyParser = require('body-parser')
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const host = 'localhost';
const port = 8000;
// Spin up the server
const server = app.listen(port,host, listening);
 function listening(){
    console.log(server);
    console.log(`running on localhost: ${port}`);
  };
// Callback to debug
app.get('/retrieve', callBack);
// Initialize all route with a callback function
function callBack(req,res){
    res.send(projectData);    
  }
// Callback function to complete GET '/all'
app.post('/add', postData)
// Post Route
function postData(req, res)  {
    projectData = req.body;
    console.log(projectData);
    res.send({ message: "Post recieved"})
    console.log(req);
}