// $(document).ready(function () {
//     var editProfileButton = $(".editProfileButton"); // Store a reference to the "Edit Profile" button
//     var editDiv = $(".editDiv"); // Store a reference to the button's container div

//     // Function to set up the "Edit Profile" button event listener
//     function setupEditProfileButton() {
//         editProfileButton.on("click", function () {
//             // Remove the "Edit Profile" button
//             editProfileButton.remove();

//             // Store the original values for canceling
//             var originalValues = {
//                 fname: $(".fullname > div:nth-child(1)").text(),
//                 lname: $(".fullname > div:nth-child(2)").text(),
//                 quote: $(".quote").text(),
//                 quoteDesc: $(".quote_desc").text(),
//                 description: $(".random-fact > div:nth-child(7)").text(),
//                 about: $(".random-fact > div:nth-child(3)").text()
//             };

//             // Enable editing of fname
//             var fnameInput = $("<input>").attr("type", "text").val(originalValues.fname).css("width", "90%").css("height", "25px");
//             $(".fullname > div:nth-child(1)").empty().append(fnameInput);

//             // Enable editing of lname
//             var lnameInput = $("<input>").attr("type", "text").val(originalValues.lname).css("width", "90%").css("height", "25px");
//             $(".fullname > div:nth-child(2)").empty().append(lnameInput);


//             // Enable editing of quote
//             var quoteInput = $("<textarea>")
//                 .text(originalValues.quote)
//                 .css("width", "100%")
//                 .css("height", "100px");
//             $(".quote").empty().append(quoteInput);

//             // Enable editing of quote description
//             var quoteDescInput = $("<textarea>")
//                 .text(originalValues.quoteDesc)
//                 .css("width", "100%")
//                 .css("height", "100px");
//             $(".quote_desc").empty().append(quoteDescInput);

//             // Enable editing of description section
//             var descriptionInput = $("<textarea>")
//                 .text(originalValues.description)
//                 .css("width", "100%")
//                 .css("height", "100px");
//             $(".random-fact > div:nth-child(7)").empty().append(descriptionInput);

//             // Enable editing of about section
//             var aboutInput = $("<textarea>")
//                 .text(originalValues.about)
//                 .css("width", "100%")
//                 .css("height", "100px");
//             $(".random-fact > div:nth-child(3)").empty().append(aboutInput);

//             // Create a save button
//             var saveButton = $("<button>").addClass("likeDislike").text("Save");
//             saveButton.click(async function () {
//                 // Update the details with the new values
//                 var newFname = fnameInput.val();
//                 var newLname = lnameInput.val();
//                 var newQuote = quoteInput.val();
//                 var newQuoteDesc = quoteDescInput.val();
//                 // var newDescription = descriptionInput.val();
//                 var newAbout = aboutInput.val();

//                 console.log("newFname:",newFname);
//                 console.log("newLname:",newLname);
//                 console.log("newQuote:",newQuote);
//                 console.log("newQuoteDesc:",newQuoteDesc);
//                 // console.log("newDescription:",newDescription);
//                 console.log("newAbout:",newAbout);


//                 // Send the updated profile data to the server
//                 $.get('/updateProfile', {
//                     fname: newFname,
//                     lname: newLname,
//                     quoteMain: newQuote,
//                     quoteDesc: newQuoteDesc,
//                     about: newAbout
//                 }, function(data) {
//                     // The GET request is completed, and the server has processed the data (optional)
//                     console.log("GET request to /updateProfile completed.");
//                     // If there is any data returned by the server, you can process it here
//                     console.log('data:',data);
//                 });

//                 $(".fullname > div:nth-child(1)").empty().text(newFname);
//                 $(".fullname > div:nth-child(2)").empty().text(newLname);
//                 $(".quote").empty().text(newQuote);
//                 $(".quote_desc").empty().text(newQuoteDesc);
//                 $(".random-fact > div:nth-child(3)").empty().text(newAbout);
//                 // Remove the save button and cancel button
//                 saveButton.remove();
//                 cancelButton.remove();

//                 // Append the "Edit Profile" button back to its original position
//                 editDiv.append(editProfileButton);

//                 // Set up the event listener again for the "Edit Profile" button
//                 setupEditProfileButton();

//             });

//             // Create a cancel button
//             var cancelButton = $("<button>").addClass("likeDislike").text("Cancel");
//             cancelButton.click(function () {
//                 // Reset the details to their original values
//                 $(".fullname > div:nth-child(1)").empty().text(originalValues.fname);
//                 $(".fullname > div:nth-child(2)").empty().text(originalValues.lname);
//                 $(".quote").empty().text(originalValues.quote);
//                 $(".quote_desc").empty().text(originalValues.quoteDesc);
//                 $(".random-fact > div:nth-child(3)").empty().text(originalValues.about);

//                 // Remove the save button and cancel button
//                 saveButton.remove();
//                 cancelButton.remove();

//                 // Append the "Edit Profile" button back to its original position
//                 editDiv.append(editProfileButton);

//                 // Set up the event listener again for the "Edit Profile" button
//                 setupEditProfileButton();
//             });

//             // Add the buttons to the container
//             editDiv.append(saveButton, cancelButton);
//         });
//     }

//     // Call the function initially to set up the event listener
//     setupEditProfileButton();
// });



$(document).ready(function () {
    var editProfileButton = $(".editProfileButton"); // Store a reference to the "Edit Profile" button
    var editDiv = $(".editDiv"); // Store a reference to the button's container div

    // Function to set up the "Edit Profile" button event listener
    function setupEditProfileButton() {
        editProfileButton.on("click", function () {
            // Remove the "Edit Profile" button
            editProfileButton.remove();

            // Store the original values for canceling
            var originalValues = {
                fname: $(".fullname > div:nth-child(1)").text(),
                lname: $(".fullname > div:nth-child(2)").text(),
                quote: $(".quote").text(),
                quoteDesc: $(".quote_desc").text(),
                description: $(".random-fact > div:nth-child(7)").text(),
                about: $(".random-fact > div:nth-child(3)").text(),
                profPic: $(".profPic > img").attr("src") // Get the current profile picture URL
            };

            // Enable editing of fname
            var fnameInput = $("<input>").attr("type", "text").val(originalValues.fname).css("width", "90%").css("height", "25px");
            $(".fullname > div:nth-child(1)").empty().append(fnameInput);

            // Enable editing of lname
            var lnameInput = $("<input>").attr("type", "text").val(originalValues.lname).css("width", "90%").css("height", "25px");
            $(".fullname > div:nth-child(2)").empty().append(lnameInput);

            // Enable editing of quote
            var quoteInput = $("<textarea>")
                .text(originalValues.quote)
                .css("width", "100%")
                .css("height", "100px");
            $(".quote").empty().append(quoteInput);

            // Enable editing of quote description
            var quoteDescInput = $("<textarea>")
                .text(originalValues.quoteDesc)
                .css("width", "100%")
                .css("height", "100px");
            $(".quote_desc").empty().append(quoteDescInput);

            // Enable editing of description section
            var descriptionInput = $("<textarea>")
                .text(originalValues.description)
                .css("width", "100%")
                .css("height", "100px");
            $(".random-fact > div:nth-child(7)").empty().append(descriptionInput);

            // Enable editing of about section
            var aboutInput = $("<textarea>")
                .text(originalValues.about)
                .css("width", "100%")
                .css("height", "100px");
            $(".random-fact > div:nth-child(3)").empty().append(aboutInput);

            // Enable editing of profile picture URL
            var profPicInput = $("<input>").attr("type", "text").val(originalValues.profPic).css("width", "90%").css("height", "25px");
            $(".profPic > img").attr("src", originalValues.profPic); // Set the current profile picture URL in the img tag
            $(".profPic").append(profPicInput);

            // Create a save button
            var saveButton = $("<button>").addClass("likeDislike").text("Save");
            saveButton.click(async function () {
                // Update the details with the new values
                var newFname = fnameInput.val();
                var newLname = lnameInput.val();
                var newQuote = quoteInput.val();
                var newQuoteDesc = quoteDescInput.val();
                var newAbout = aboutInput.val();
                var newProfPic = profPicInput.val();

                console.log("newFname:", newFname);
                console.log("newLname:", newLname);
                console.log("newQuote:", newQuote);
                console.log("newQuoteDesc:", newQuoteDesc);
                console.log("newAbout:", newAbout);
                console.log("newProfPic:", newProfPic);

                // Send the updated profile data to the server
                $.get('/updateProfile', {
                    fname: newFname,
                    lname: newLname,
                    quoteMain: newQuote,
                    quoteDesc: newQuoteDesc,
                    about: newAbout,
                    profPic: newProfPic // Include the new profile picture URL in the GET request
                }, function (data) {
                    // The GET request is completed, and the server has processed the data (optional)
                    console.log("GET request to /updateProfile completed.");
                    // If there is any data returned by the server, you can process it here
                    console.log('data:', data);
                });

                $(".fullname > div:nth-child(1)").empty().text(newFname);
                $(".fullname > div:nth-child(2)").empty().text(newLname);
                $(".quote").empty().text(newQuote);
                $(".quote_desc").empty().text(newQuoteDesc);
                $(".random-fact > div:nth-child(3)").empty().text(newAbout);
                $(".profPic > img").empty().attr("src", newProfPic); // Update the profile picture URL

                // Remove the save button and cancel button
                profPicInput.remove();
                saveButton.remove();
                cancelButton.remove();

                // Append the "Edit Profile" button back to its original position
                editDiv.append(editProfileButton);

                // Set up the event listener again for the "Edit Profile" button
                setupEditProfileButton();
            });

            // Create a cancel button
            var cancelButton = $("<button>").addClass("likeDislike").text("Cancel");
            cancelButton.click(function () {
                // Reset the details to their original values
                $(".fullname > div:nth-child(1)").empty().text(originalValues.fname);
                $(".fullname > div:nth-child(2)").empty().text(originalValues.lname);
                $(".quote").empty().text(originalValues.quote);
                $(".quote_desc").empty().text(originalValues.quoteDesc);
                $(".random-fact > div:nth-child(3)").empty().text(originalValues.about);
                $(".profPic > img").attr("src", originalValues.profPic); // Reset the profile picture URL

                // Remove the save button and cancel button
                profPicInput.remove();
                saveButton.remove();
                cancelButton.remove();

                // Append the "Edit Profile" button back to its original position
                editDiv.append(editProfileButton);

                // Set up the event listener again for the "Edit Profile" button
                setupEditProfileButton();
            });

            // Add the buttons to the container
            editDiv.append(saveButton, cancelButton);
        });
    }

    // Call the function initially to set up the event listener
    setupEditProfileButton();
});

