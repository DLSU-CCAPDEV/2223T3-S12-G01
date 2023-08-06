$(document).ready(function () {


    function isFilled() {
        var fName = validator.trim($('#user_fn').val());
        var lName = validator.trim($('#user_ln').val());
        var uName = validator.trim($('#username').val());
        var email = validator.trim($('#user_email').val());
        var pw = validator.trim($('#user_pw').val());

        var fNameEmpty = validator.isEmpty(fName);
        var lNameEmpty = validator.isEmpty(lName);
        var uNameEmpty = validator.isEmpty(uName);
        var emailEmpty = validator.isEmpty(email);
        var pwEmpty = validator.isEmpty(pw);

        return !fNameEmpty && !lNameEmpty && !uNameEmpty && !emailEmpty && !pwEmpty;
    }

    function isValidUName(field, callback) {


            var uName = validator.trim($('#username').val());
            $.get('/getCheckUName', {uName: uName}, function (result) {

                if(result.uname != uName) {

                    console.log("username no match");
                    if(field.is($('#username')))
                        $('#uNameError').text('');


                    return callback(true);

                }

                else {

                    console.log("username match found");
                    if(field.is($('#username')))
                        $('#uNameError').text('Username already registered.');


                    return callback(false);
                }
            });
    }

    function isValidEmail(field) {

        var isValid = false;
            var email = validator.trim($('#user_email').val());
            var isValidEmail = validator.isEmail(email);
    
            if (isValidEmail) {
                if(field.is($('#user_email'))){
                    console.log("valid email");
                    $('#emailError').text('');
                }
                   
                isValid = true;
            } else {
                if(field.is($('#user_email'))){
                    $('#emailError').text('Invalid email format.');
                    console.log("invalid email");
                }
                    
            }
        return isValid;
    }
    

    function validateField(field, fieldName, error) {

    
        var value = validator.trim(field.val());
        var empty = validator.isEmpty(value);


        if(empty) {
       
            field.prop('value', '');
            console.log("field empty")
            error.text(fieldName + ' should not be empty.');

        }

   
        else

            error.text('');

        var filled = isFilled();

        var validEmail = isValidEmail(field)

      
        isValidUName(field, function (validUName) {

            if(filled && validEmail &&validUName)
                $('#submit').prop('disabled', false);

            else
                $('#submit').prop('disabled', true);
        });
    }
    $('#user_fn').on('input',function () {

        console.log("fn - Check");
        validateField($('#user_fn'), 'First name', $('#fNameError'));
    });
    $('#user_ln').on('input',function () {

        console.log("ln - Check");
        validateField($('#user_ln'), 'Last name', $('#lNameError'));
    });
    $('#user_pw').on('input',function () {

        console.log("pw - Check");
        validateField($('#user_pw'), 'Password', $('#passwordError'));
    });
    $('#username').on('input',function () {

        console.log("uName - Check");
        validateField($('#username'), 'Username', $('#uNameError'));
    });
    $('#user_email').on('input',function () {

        console.log("email - Check");
        validateField($('#user_email'), 'Email', $('#emailError'));
    });

});