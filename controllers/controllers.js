// import module `database` from `../models/db.js`
const db = require('../models/db.js');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const reviewId = new ObjectId();

// import module `User` from `../models/UserModel.js`
const Resto = require('../models/RestoModel.js');
const Profile = require('../models/ProfileModel.js');
const Establishment = require('../models/RestoModel.js');
const Review = require('../models/PostModel.js');
const Reply = require('../models/ReplyModel.js');

const controller = {
	getMain: function(req, res){
		if(req.session.curUser){
			res.redirect('profile/'+req.session.curUser);
		}else{
			res.render('main');
		}
		
	},

	redirectToRoot: function(req, res){
		res.redirect('/login');
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
	},

	showHome: function (req, res) {
		if(req.session.curUser){
			res.render('home', {flag: true , curUser: req.session.curUser});
		}else{
			res.render('home', {flag: false});
		}
		 // Assuming the filename is restoList.hbs
	},

	showRestoList: async (req, res) => {
		var projection = 'restoName email password address greetings about profPic';
		try {
			await db.connect();
			const restaurants = await db.findMany(Resto, {isUser: false}, projection);
			// console.log('Restaurants:', restaurants); // Add this line to check if restaurants are fetched
			if(req.session.curUser){
				res.render('restoList', { restaurants, flag: true , curUser: req.session.curUser});
			}else{
				res.render('restoList', { restaurants, flag: true });
			}
			
		} catch (err) {
			console.error('Error while fetching restaurants:', err);
			res.render('error');
		}
	},

	createReview: async function(req, res) {
		try {
			// Extract the data from the request body
			var Uname = req.query.uname;
			var Post = req.query.post;
			var Date = req.query.date;
			var Dislike = req.query.dislike;
			var Likes = req.query.likes;
			var Reviewing = req.query.reviewing;
	
			// Create an object to store the new review data
			const newReviewData = {
				_id: reviewId,
				uname: Uname,
				post: Post,
				date: Date,
				dislike: Dislike,
				likes: Likes,
				reviewing: Reviewing
			};
	
			console.log("Review:", newReviewData);
	
			// Connect to the database (assuming db.connect() is already done somewhere in your application)
			// If not, make sure to establish a database connection before saving the review.
	
			// Create a new review instance based on the Review model and save it to the database
			const newReview = new Review(newReviewData);
			await newReview.save();
	
			console.log('New Review Added:', newReview);
	
			// Send a response back indicating the review creation was successful
			res.status(200).json({
				success: true,
				message: 'Review created successfully',
				review: newReview
			});
		} catch (err) {
			console.error('Error while adding review:', err);
			res.status(500).json({
				success: false,
				message: 'An error occurred while creating the review',
				error: err.message
			});
		}
	},

	createReply: async function(req, res) {
		try {
			// Extract the data from the request body
			var Uname = req.query.uname;
			var Reply = req.query.reply;
			var Date = req.query.date;
			var Dislike = req.query.dislike;
			var Likes = req.query.likes;
			var Reviewing = req.query.reviewing;
	
			// Create an object to store the new review data
			const newReviewData = {
				_id: reviewId,
				uname: Uname,
				post: Post,
				date: Date,
				dislike: Dislike,
				likes: Likes,
				reviewing: Reviewing
			};
	
			console.log("Review:", newReviewData);
	
			// Connect to the database (assuming db.connect() is already done somewhere in your application)
			// If not, make sure to establish a database connection before saving the review.
	
			// Create a new review instance based on the Review model and save it to the database
			const newReview = new Review(newReviewData);
			await newReview.save();
	
			console.log('New Review Added:', newReview);
	
			// Send a response back indicating the review creation was successful
			res.status(200).json({
				success: true,
				message: 'Review created successfully',
				review: newReview
			});
		} catch (err) {
			console.error('Error while adding review:', err);
			res.status(500).json({
				success: false,
				message: 'An error occurred while creating the review',
				error: err.message
			});
		}
	},

	logout: function(req, res){
		req.session.destroy(function(err){
			if(err) throw err;
			res.render('main');
		})
	}
}
exports.showProfile = async (req, res) =>{
	const username = req.params.username;

	try{
		const user = await User.findOne({uname: username});
		const reviews = await Post.find({uname: username});
		res.render('profile', {user, reviews});
	}catch (err){
		console.error('Error fetching profile data',err);
		res.status(500).send('Error fetching profile data');
	}
};
module.exports = controller