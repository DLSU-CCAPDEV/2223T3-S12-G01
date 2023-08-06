    // import module `database` from `../models/db.js`
    const db = require('../models/db.js');

    // import module `User` from `../models/UserModel.js`
    const Profile = require('../models/ProfileModel.js');
    const Establishment = require('../models/RestoModel.js');
    const Post = require('../models/PostModel.js');
    const Reply = require('../models/ReplyModel.js');


    const profileController = {

        showProfile: async (req, res) => {
                const username = req.params.uname;
                // console.log('showprofile-username:', req.params.uname);
                var query =  {uname: username};
                var projection = 'uname fname lname profPic quoteDesc quoteMain about';

                try {
                    const profile = await db.findOne(Profile, query, projection);
                    // console.log('profile:', profile)
                    if (profile) {
                    // User found, render the profile page with user data
                    const posts = await Post.find({ uname: profile.uname });
                    
                    for(const post of posts){
                        const reply = await Reply.find({uname: post.uname, post: post.post, date: post.date })
                        if(reply){
                            post.reply = reply;
                        }
                    }
                    // Add the fetched `posts` array to the `profile` object
                    profile.posts = posts;
                        if(req.session.curUser == profile.uname){
                            console.log("showProfile-Session:"+req.session.curUser);
                            res.render('profile', { profile, flag: true, owner:true ,curUser: req.session.curUser});
                        }else{
                            // console.log("showProfile-Session: Not found");
                            res.render('profile', { profile, flag: true, owner:false});
                        }
                    } else {
                        // User not found, render an error page
                        // res.render('error');
                        
                        
                    }
                } catch (err) {
                    console.error('Error fetching profile data', err);
                    res.status(500).send('Error fetching profile data');
                }
            
        },
        
        showResto: async (req, res) => {
            const email = req.params.email;
            // console.log('showprofile-email:', req.params.email);
            var query =  {email: email};
            var projection = 'restoName email password address greetings about profPic';

            try {
                const resto = await db.findOne(Establishment, query, projection);
                // console.log('resto:', resto)
                if (resto) {
                    // User found, render the profile page with user data
                    const posts = await Post.find({ reviewing: resto.restoName});

                    for(const post of posts){
                        const reply = await Reply.find({uname: post.uname, post: post.post, date: post.date })
                        if(reply){
                            post.reply = reply;
                        }
                    }
                    // Add the fetched `posts` array to the `profile` object
                    resto.reviews = posts;    
                    // console.log('resto-with-reviews:', resto)
                    // User found, render the profile page with user data
                    if(req.session.curUser){
                        res.render('resto', { resto, flag: true ,curUser: req.session.curUser});
                    }else{
                        res.render('resto', { resto, flag: false ,curUser: req.session.curUser});
                    }
                    
                } else {
                    // Resto not found, render an error page
                    // res.render('error');
                    res.render('resto', { resto });
                }
            } catch (err) {
                console.error('Error fetching profile data', err);
                res.status(500).send('Error fetching profile data');
            }
        },

        showRestoProfile: async (req, res) => {
            const email = req.params.email;
            // console.log('showprofile-email:', req.params.email);
            var query =  {email: email};
            var projection = 'restoName email password address greetings about profPic';

            try {
                const restoprofile = await db.findOne(Establishment, query, projection);
                // console.log('restoprofile:', restoprofile)
                if (restoprofile) {
                    const posts = await Post.find({ reviewing: restoprofile.restoName});

                    for(const post of posts){
                        const reply = await Reply.find({uname: post.uname, post: post.post, date: post.date })
                        if(reply){
                            post.reply = reply;
                        }
                    }
                    restoprofile.reviews = posts;    
                    // console.log('restoprofile-with-reviews:', restoprofile)
                    // User found, render the profile page with user data
                    res.render('restoProfile', { restoprofile });
                } else {
                    // User not found, render an error page
                    // res.render('error');
                    res.render('restoProfile', { restoprofile });
                }
            } catch (err) {
                console.error('Error fetching profile data', err);
                res.status(500).send('Error fetching profile data');
            }
        },

        // Function to handle the "Reply" button click
        replyToReview: async (req, res) => {
            const reviewId = req.params.reviewId;

            // console.log(reviewId);

            const { reply } = req.body;           

            try {
                // Find the review by its ID
                const review = await Post.findById(reviewId);
                if (review) {
                    // Create a new reply object
                    const newReply = new Reply({
                        uname: req.user.uname, // Assuming you have a user object available with the username
                        reply: reply,
                        replier: req.user.uname,
                        date: new Date(),
                        post: review.post,
                        dateReplied: new Date().toISOString() // Use the appropriate date format for your application
                    });

                    // Save the new reply to the database
                    await newReply.save();

                    res.status(200).json({ message: 'Reply added successfully' });
                } else {
                    res.status(404).json({ error: 'Review not found' });
                }
            } catch (err) {
                console.error('Error adding reply', err);
                res.status(500).json({ error: 'Error adding reply' });
            }
        },

        likeReview: async (req, res) => {
            const reviewId = req.params.reviewId;
            try {
                const review = await Post.findById(reviewId);
                if (review) {
                    review.likes++; // Increment the number of likes
                    await review.save(); // Save the updated review
                    res.status(200).json({ message: 'Review liked successfully', likes: review.likes });
                } else {
                    res.status(404).json({ error: 'Review not found' });
                }
            } catch (err) {
                console.error('Error liking review', err);
                res.status(500).json({ error: 'Error liking review' });
            }
        },
         
        // Function to handle disliking a review
        dislikeReview: async (req, res) => {
            const reviewId = req.params.reviewId;
            try {
                const review = await Post.findById(reviewId);
                if (review) {
                    review.dislike++; // Increment the number of dislikes
                    await review.save(); // Save the updated review
                    res.status(200).json({ message: 'Review disliked successfully', dislike: review.dislike });
                } else {
                    res.status(404).json({ error: 'Review not found' });
                }
            } catch (err) {
                console.error('Error disliking review', err);
                res.status(500).json({ error: 'Error disliking review' });
            }
        },

        editReply: async (req, res) => {
            const replyId = req.params.replyId;
            const { reply } = req.body;

            try {
                const replyData = await Reply.findById(replyId);
                console.log('Reply Data:', replyData);
                if (replyData) {
                    if (reply !== undefined && reply.trim() !== '') {
                        replyData.reply = reply;
                        await replyData.save();
                        res.status(200).json({ message: 'Reply edited successfully', reply: replyData.reply });
                    } else {
                        res.status(400).json({ error: 'Reply content cannot be empty' });
                    }
                } else {
                    res.status(404).json({ error: 'Reply not found' });
                }
            } catch (err) {
                console.error('Error editing reply', err);
                res.status(500).json({ error: 'Error editing reply' });
            }
        },
    
        deleteReply: async (req, res) => {
            const replyId = req.params.replyId;
            try {
                // Find the reply by its ID and remove it from the database
                await Reply.findByIdAndRemove(replyId);
                res.status(200).json({ message: 'Reply deleted successfully' });
                window.location.reload();
            } catch (err) {
                console.error('Error deleting reply', err);
                res.status(500).json({ error: 'Error deleting reply' });
            }
        },

        updateProfile : async (req, res) => {
            try {
                Fname = req.query.fname;
                Lname = req.query.lname;
                QuoteMain = req.query.quoteMain;
                QuoteDesc = req.query.quoteDesc;
                About = req.query.about;
                ProfPic = req.query.profPic;

                console.log('updateProfile - fname:', Fname);
                console.log('updateProfile - lname:', Lname);
                console.log('updateProfile - quuoteMain:', QuoteMain);
                console.log('updateProfile - quoteDesc:', QuoteDesc);
                console.log('updateProfile - about:', About);
                console.log('updateProfile - profPic:', ProfPic);
                // Get the username from the session (assuming it's stored as curUser)
                const username = req.session.curUser;

                // Define the filter to find the profile to be updated
                const filter = { uname: username };

                // Define the update object with the new profile data
                const update = {
                    fname: Fname,
                    lname: Lname,
                    quoteMain: QuoteMain,
                    quoteDesc: QuoteDesc,
                    about: About,
                    profPic: ProfPic
                };

                // Update the profile using the updateOne function from db.js
                await db.updateOne(Profile, filter, update);
                res.send(update);
            } catch (err) {
                console.error('Error updating profile:', err);
                res.status(500).send('Error updating profile');
            }
        }


    };

    /*
        exports the object `profileController` (defined above)
        when another script exports from this file
    */
    module.exports = profileController;