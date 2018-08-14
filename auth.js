const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

let app = express();
let PORT = process.env.PORT || 8888;

app.use(bodyParser.json());
app.use(cors());

const users = [
    {id: 1, username: "guest", password: "guest"},
    {id: 2, username: "admin", password: "admin"}
];

app.get('/status', (req, res) => {
    const localTime = new Date().toLocaleTimeString();

    res
    .status(200)
    .send(`Server time is ${localTime}`);
});

app.post('/login', (req, res) => {
    if(!req.body.username || !req.body.password){
        res
        .status(400)
        .send('You need a username and password.');
        return;
    }

    const user = users.find((u) => {
        return u.username === req.body.username && u.password === req.body.password
    });

    if(!user){
        res
        .status(401)
        .send('You are not authorized.');
        return;
    }

    const token = jwt.sign(
        {
            sub: user.id,
            username: user.username
        }, 'mySuperSecretKey', {expiresIn: "3 hours"}
    );

    res
    .status(200)
    .send({access_token: token});
});

app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
