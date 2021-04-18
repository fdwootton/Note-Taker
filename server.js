const express = require('express');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes (GET)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html'))); //Home page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html'))); //Note page
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html')));

//Routes (POST)
app.post('/api/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Listener for Server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));