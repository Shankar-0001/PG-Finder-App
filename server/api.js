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

//API for getting Products from the database

app.get('/products',(req, res) =>{
    mongoClient.connect(conUrl).then(obj =>{
        var database = obj.db('pgdatabase');
        database.collection('products').find({}).toArray().then(documents =>{
            res.send(documents);
            res.end();
        });
    });
});

// API for getting users from the database;

app.get('/users', (req, res) => {
    mongoClient.connect(conUrl).then(obj => {
        var database = obj.db('pgdatabase');
        database.collection('users').find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

//Get Admin from the database

app.get('/admin', (req, res) => {
    mongoClient.connect(conUrl).then(obj => {
        var database = obj.db('pgdatabase');
        database.collection('admin').find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
})

//API  for register users on database.

app.post('/register-users', (req, res) => {
    mongoClient.connect(conUrl).then(obj => {
        var database = obj.db('pgdatabase');
        var user = {
            UserId: req.body.UserId,
            UserName: req.body.UserName,
            Password: req.body.Password,
            Email: req.body.Password
        };
        database.collection('users').insertOne(user).then(() => {
            console.log('User Registered...');
            res.end();
        });
    });
});




app.listen(4040);
console.log('server started at http://127.0.0.1:4040');