// import module `express`
const express = require('express');

// import module `hbs`
const hbs = require('hbs');

var cookieParser = require('cookie-parser');
const session = require('express-session');

// import module `routes` from `./routes/routes.js`
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');
const Profile = require('./models/ProfileModel.js');
const Post = require('./models/PostModel.js');
const Resto = require('./models/RestoModel.js');
const Reply = require('./models/ReplyModel.js');

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(session({
    'secret': 'user-session'
}));
// set `hbs` as view engine
app.set('view engine', 'hbs');

// sets `/views/partials` as folder containing partial hbs files
hbs.registerPartials(__dirname + '/views/partials');

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));

// define the paths contained in `./routes/routes.js`
app.use('/', routes);

// if the route is not defined in the server, render `../views/error.hbs`
// always define this as the last middleware
// app.use(function (req, res) {
//     res.render('error');
// });

// connects to the database
db.connect();

// use `express-session`` middleware and set its options
// use `MongoStore` as server-side session storage


app.get('/initialize-session', (req, res) => {
    // Check if the session object exists
    if (req.session) {
      // Set the session variable "test" to a number
      req.session.test = 42;
      // Log the value of the session variable
      console.log('Session variable "test" has been set:', req.session.test);
    }
  
    res.send('Session variable "test" has been initialized and set.');
  });
// binds the server to a specific port
app.listen(port, function () {
    console.log('app listening at port ' + port);
});