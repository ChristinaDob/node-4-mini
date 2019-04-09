const express = require('express');
const messageCtrl = require('./messagesCtrl');
const session = require('express-session');

const app = express();

app.use(express.json());
require('dotenv').config();

const { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use((req, res, next) => {
  let badWords = ['knucklehead', 'jerk', 'internet explorer'];
  if (req.body.message) {
    for (let i = 0; i < badWords.length; i++) {
      let regex = new RegExp(badWords[i], 'g');
      req.body.message = req.body.message.replace(regex, '****');
    }
    next();
  } else {
    next();
  }
});

app.get('/api/messages', messageCtrl.getAllMessages);

app.post('/api/message', messageCtrl.createMessage);
app.get('/api/messages/history', messageCtrl.history);

app.listen(SERVER_PORT, () => {
  console.log(`My server is listening on port: ${SERVER_PORT}`);
});
