const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('../Smartbrain-backend/controllers/register');
const signin = require('../Smartbrain-backend/controllers/signin');
const profile = require('../Smartbrain-backend/controllers/profile');
const image = require('../Smartbrain-backend/controllers/image');

const db =  knex({
    client: 'pg',
    connection : 'postgres://tejas:1234@localhost/Smart_brain'  
});
  
const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('');
})

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(5000, () => {
    console.log('app is running on 5000');
})
