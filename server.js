//Required packages
const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 8000;


//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//----------------------API Routes----------------------

//POST: Save new note to api(db.json)
app.post('/api/notes', (req, res) => {

    const payload = req.body //already a json object

    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (error, data) => { //get current contents of db.json file
        if (error) {console.log(error)};
    
        const dbJSON = JSON.parse(data); //convert the contents of the db.json file from string to a JSON object
        dbJSON.push(payload); //add newest note (as a json object) to content of the db.json file

        const allNotesArray = []; //create an empty array to hold the new array that contains the new note
        let idNum = 1;
        for (let i = 0; i < dbJSON.length; i++) //Loop through the contents of db.json to create a new array
        {    
            const newNote = {
                title: dbJSON[i].title,
                text: dbJSON[i].text,
                id: idNum
            };
            idNum ++;
            allNotesArray.push(newNote); //add all notes to empty array
        }

        //Overwrite the db.json file with new array that contains newest note
        fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(allNotesArray, null, 2), (error) => { 
            error ? console.log(error) :  res.send(payload); //returns payload as response
        });
    });
});

//GET: Retrieve notes from api (db.json)
app.get('/api/notes', (req, res) => {  
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (error, data) => {
        error ? console.log(error) : res.send(JSON.parse(data)); //returns json object as the response
    });
});

//DELETE: Delete note from api (db.json)

//-----------------------HTML Routes (GET)-----------------------
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html'))); //Home page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html'))); //Note page
app.get("*", (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html'))); //All other URLs go to Home Page


//----------------------Listener for Server--------------------------
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));