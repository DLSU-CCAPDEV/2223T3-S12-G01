// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Establishment` from `../models/EstablishmentModel.js`
const Establishment = require('../models/RestoModel.js');

const restoLoginController = {

  showRestoLogin: function (req, res) {
    res.render('restoLogin'); // Assuming the filename is restoLogin.hbs
  },

  postRestoLogin: async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    // console.log(email, password);
    var query = { email: email, password: password, isUser: false };
    var projection = 'restoName email';

    try {
      await db.connect();
      const establishment = await db.findOne(Establishment, query, projection);
      if (establishment) {
        // Establishment found
        // console.log('Establishment found:', establishment);
        // Redirect to the establishment profile page passing the establishment data
        res.redirect(`/restoProfile/${establishment.email}`);
      } else {
        // Establishment not found or invalid credentials
        // console.log('Establishment not found');
        // Render the login page with an error message
        res.render('restoLogin', { loginError: 'Invalid email or password' });
      }
    } catch (err) {
      console.error('Error while logging in:', err);
      res.render('error');
    }
  }
};

module.exports = restoLoginController;
