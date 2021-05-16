const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT || 5000;


app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('datbase.db');
database.loadDatabase();
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/Index.html');
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});
