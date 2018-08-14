const express = require('express');
const expressJwt = require('express-jwt');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.API_PORT || 8888;

const checkJWT = expressJwt({
    secret: 'mySuperSecretKey'
});

app.get('/resource', (req, res) => {
    res
    .status(200)
    .send('Public resource, you have see these.');
});

app.get('/resource/secret', checkJWT, (req, res) => {
    res
    .status(200)
    .send('Protected resource, you cannot see these unless logged in.');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});