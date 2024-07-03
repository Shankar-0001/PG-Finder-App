var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var cors = require('cors');


var app = express();
var conUrl = 'mongodb+srv://Shekhar123:Shekhar123@cluster0.dyoi4ck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(cors());

// API for getting users from the database;

app.get('/users', (req, res) => {
    mongoClient.connect(conUrl).then(obj => {
        var database = obj.db('pgdatabase');
        database.collection('users').find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
})



app.listen(4040);
console.log('server started at http://127.0.0.1:4040');