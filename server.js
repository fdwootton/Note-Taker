const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//----------------------API Routes----------------------

//Save new note to api(db.json)
app.post('/api/notes', (req, res) => {});

//Get notes from api (db.json)
app.get('/api/notes', (req, res) => {  
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (error, data) => {
        error ? console.log(error) : res.json(JSON.parse(data)); //returns json object as the response
    });
});

//HTML Routes (GET)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html'))); //Home page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html'))); //Note page
app.get("*", (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html'))); //All other URLs go to Home Page

// Listener for Server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));