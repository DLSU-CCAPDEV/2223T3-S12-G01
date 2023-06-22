const express =  require('express');

const controller = require('../controllers/controllers.js');

const app  = express();

app.get('/', controller.getRoot);
app.get('/login', controller.redirectToRoot);
app.get('/home', controller.getRoot);
app.get('/profile/:username', controller.getProfile);
app.post('/logincheck', controller.checkAcc);

module.exports = app;