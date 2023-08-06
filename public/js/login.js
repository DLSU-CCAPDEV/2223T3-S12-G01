$(document).ready(function () {


    function isFilled() {
        var uName = validator.trim($('#username').val());
        var pw = validator.trim($('#user_pw').val());

        var uNameEmpty = validator.isEmpty(uName);
        var pwEmpty = validator.isEmpty(pw);

        return !uNameEmpty && !pwEmpty;
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

            if(filled)
                $('#submit').prop('disabled', false);

            else
                $('#submit').prop('disabled', true);
    }

   
    $('#user_pw').on('input',function () {

        console.log("pw - Check");
        validateField($('#user_pw'), 'Password', $('#passwordError'));
    });
    $('#username').on('input',function () {

        console.log("uName - Check");
        validateField($('#username'), 'Username', $('#uNameError'));
    });
});