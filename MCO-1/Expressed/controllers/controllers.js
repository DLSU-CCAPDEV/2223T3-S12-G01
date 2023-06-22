const controller = {
	getRoot: function(req, res){
		res.render('login');
	},

	redirectToRoot: function(req, res){
		res.render('/');
	},

	getProfile: function(req, res){
		var username = req.params.username;
		var idnum = req.params.idnum;
		res.send(username + ' ' + idnum);
	},

	checkAcc: function(req, res){
		var email = req.body.user_email;
		var password = req.body.user_pw;

		res.render('profile', {email:email});
	}
}

module.exports = controller