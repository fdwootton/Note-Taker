const express = require('express');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//API Routes
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, 'db', 'db.json'))); //Show notes

app.post('/api/notes', (req, res) => { //Save notes
    let newNote = JSON.stringify(req.body);
}); 

//HTML Routes (GET)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html'))); //Home page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html'))); //Note page
app.get("*", (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html'))); //All other URLs go to Home Page

// Listener for Server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));