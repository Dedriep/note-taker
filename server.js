const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


const noteData = require('../db/db.json');
const PORT = process.env.PORT || 3001;

app.get('/api/index', (req, res) => {
    let results = noteData;
    if (req.query) {
      results = filterfunction(req.query, results);
    }
    res.json(results);
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });


app.listen(PORT , () => {
    console.log(`API server now on port 3001!`);
  });

