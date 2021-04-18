const express = require('express');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html'))); //Home page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html'))); //Note page

// Listener for Server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));