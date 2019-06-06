const ObjectId = require('mongodb').ObjectId;

module.exports = (app, db) => {
    app.get('/notes/:id', (req, res) => {
        console.log(`get request ${req}`);
        const id = req.params.id;
        const details = { _id: new ObjectId(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ error: 'An error has occurred on GET' });
            } else {
                res.send(item);
            }
        });
    });

    app.post('/notes', (req, res) => {
        const note = {
            text: req.body.text,
            title: req.body.title,
        };
        db.collection('notes').insertOne(note, (err, result) => {
            if (err) {
                res.send({ error: 'An error has occurred on POST' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { _id: new ObjectId(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ error: 'An error has occurred on DELETE' });
            } else {
                res.send(`Note ${id} was deleted!`);
            }
        });
    });

    app.put('/notes/:id', (req, res) => {
        // TODO: only update fields if included in the request

        const id = req.params.id;
        const details = { _id: new ObjectId(id) };

        const note = {
            text: req.body.text,
            title: req.body.title,
        };

        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({ error: 'An error has occurred on PUT' });
            } else {
                res.send(note);
            }
        });
    });

    app.patch('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { _id: new ObjectId(id) };

        const note = {};
        if (req.body.text) {
            note.text = req.body.text;
        }
        if (req.body.title) {
            note.title = req.body.title;
        }

        db.collection('notes').update(details, { $set: note }, (err, result) => {
            if (err) {
                res.send({ error: 'An error has occured on PATCH' });
            } else {
                res.send(note);
            }
        });
    });
};
