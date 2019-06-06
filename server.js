const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/db');

const port = process.env.PORT || 5500;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
    db.url,
    { useNewUrlParser: true },
    (err, database) => {
        if (err) return console.log(err);

        myDb = database.db('notes');
        require('./app/routes')(app, myDb);

        app.listen(port, () => {
            console.log(`We are live on ${port}`);
            console.log(`Heroku port: ${process.env.PORT}`);
        });
    }
);
