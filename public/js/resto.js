$(document).ready(function() {
    $("form").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission 

        // Get the form values
        var restoRate = $("#user_ln").val();
        var restoComment = $("#restoComment").val();
        var curUser = $("#username").text();
        var restoMail = $("#restoMail").text();
        var resto = $("#restoName").text();

        // Create a new div element to display the form data
        var review = $("<div>").addClass("review");

        // Create a new <p> element for the comment
        var commentElement = $("<p>").text(restoComment);

        // Create a new <p> element for the current date
        var currentDate = new Date();
        var formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        // Create an edit button for the review div
        var editButton = $("<button>").text("Edit");
        editButton.click(function() {
            if (!$(this).hasClass("editing")) {
                // Enable editing of rating and comment
                var commentInput = $("<textarea>").attr({
                    rows: "10",
                    cols: "40",
                    style: "width: 95%;"
                }).text(restoComment);
                commentElement.empty().append(commentInput);

                // Create a change button
                var changeButton = $("<button>").text("Change");
                changeButton.click(function() {
                    // Update the rating and comment with the new values
                    restoComment = commentInput.val();

                    commentElement.empty().text(restoComment);

                    cancelButton.remove();
                    changeButton.remove();

                    // Re-enable the edit button for further editing
                    editButton.prop("disabled", false);

                });

                // Create a cancel button
                var cancelButton = $("<button>").text("Cancel");
                cancelButton.click(function() {
                    // Reset the rating and comment to their original values
                    commentElement.empty().text("" + restoComment);

                    cancelButton.remove();
                    changeButton.remove();

                    // Re-enable the edit button for further editing
                    editButton.prop("disabled", false);
                });

                // Replace the edit button with the change and cancel buttons
                review.append(
                    $("<div>").addClass("likeDislike").append(
                        changeButton,
                        cancelButton
                    )
                );

                // Disable the edit button while editing is in progress
                editButton.prop("disabled", true);
            }
        });

        // Create a delete button
        var deleteButton = $("<button>").text("Delete");
        deleteButton.click(function() {
            review.remove();
        });

        // Append the <p> elements to the review div
        review.append(
            $("<div>").addClass("username").html('<a href="">'+curUser+'</a>'),
            $("<div>").addClass("date").text(formattedDate),
            $("<div>").addClass("restoName").html('<a href="resto/'+restoMail+'">'+resto+'</a>'),
            $("<hr>"),
            $("<div>").addClass("comment").append(commentElement),
            $("<div>").addClass("likeDislike").append(
                $("<button>").text("Like"),
                $("<button>").text("Dislike")
            ),
            $("<div>").addClass("likeDislike").append(
                editButton,
                deleteButton,
            )
        );	

        // Append the review div to the reviewList div
        $(".reviewList").prepend(review);
            
         // Send the updated profile data to the server
         console.log("uname:", curUser);
         console.log("post:", restoComment);
         console.log("date:", formattedDate);
         console.log("reviewing:", resto);
         $.get('/createReview', {
            uname: curUser,
            post: restoComment,
            date: formattedDate,
            dislike: 0,
            likes: 0,
            reviewing: resto
        }, function (data) {
            // The GET request is completed, and the server has processed the data (optional)
            console.log("GET request to /createReview completed.");
            // If there is any data returned by the server, you can process it here
            console.log('data:', data);
        });
        // Clear the form fields
        $("#restoName").val("");
        $("#restoComment").val("");
    });
});