const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

const noteData = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf8", (error, results) => {

        //console.log("noteData", noteData);
        //console.log("fs.readfile", results);

        //Parse results to JSON object 
        const allNotes = JSON.parse(results);
        //console.log("fs.readfile", allNotes);

        //ssend it back to HTML page 
        res.json(allNotes);
    });

});

app.post('/api/notes', (req, res) => {
    console.log("Id", uid());
    //adding a new key/value 
    const newNote = {...req.body, "id": uid()};
    console.log("new note", req.body);
    fs.readFile("./db/db.json", "utf8", (error, results) => {

        //Parse results to JSON object 
        const allNotes = JSON.parse(results);

        //combine the old and new notes 
        allNotes.push(newNote);
        console.log(allNotes); 

        fs.writeFile("./db/db.json", JSON.stringify(allNotes), (error, results) => {
            if (error) {"error: ",  console.log(error)};

            console.log("result", results);

            res.json(allNotes);
        });
      
    });
   

});
//DELETE
//fs.readfile
//fs.writefile 
//array.filter 

app.delete('/api/notes/:id', (req,res) => {

    fs.readFile("./db/db.json", "utf8", (error, results) => {

        fs.writeFile("./db/db.json", JSON.stringify(noteData), (error, results) => {
            deleteData = {...req.body,}

            if (error) {"error: ",  console.log(error)}
            else { noteData.filter(deleteData)

            }

            console.log("result", results);

            res.json(allNotes);
        });
      
    });
    

})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(PORT, () => {
    console.log(`API server now on port 3001! \n http://localhost:${PORT}`);
});



