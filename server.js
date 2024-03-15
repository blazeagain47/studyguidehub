const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const app = express();
const port = 8080;

const googleClientId = '766379416504-rhddsp702ud2d9am1lqf4dro9ktgcsol.apps.googleusercontent.com';
const client = new OAuth2Client(googleClientId);

app.use(express.static('public'));
app.use(express.json());

app.post('/verifyGoogleToken', async (req, res) => {
    const {token} = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: googleClientId,
        });
        const payload = ticket.getPayload();
        const useremail = payload['email'];
        res.status(200).send({success: true, email: useremail});
    } catch (error) {
        console.error(error);
        res.status(400).send({success: false, message: "Failed to verify token"});
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
