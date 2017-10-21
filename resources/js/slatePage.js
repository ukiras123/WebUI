jQuery(document).ready(function ($) {
    function createCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }

    $('#signout').on('click', function (event) {
        eraseCookie('userName');
        eraseCookie('firstName');
        window.location.href = "slate-auth.html";
    });

});


function clearFields() {
    $('#branch').val('');
    $('#email').val('');
}

function enableFields() {
    $('#regression-btn').removeAttr("disabled");
    $('#smoke-test-btn').removeAttr("disabled");
    $('#api-name').removeAttr("disabled");
    $('#branch').removeAttr("disabled");
    $('#email').removeAttr("disabled");
}


function disableFields() {
    $('#regression-btn').attr("disabled", "disabled");
    $('#smoke-test-btn').attr("disabled", "disabled");
    $('#api-name').attr("disabled", "disabled");
    $('#branch').attr("disabled", "disabled");
    $('#email').attr("disabled", "disabled");
}

function hideResponseMessage() {
    $('#error-div').hide();
    $('#success-div').hide();
}

function triggerRegression() {
    hideResponseMessage();
    console.log("Inside Ajax")

    var apiName = $('#api-name').find(":selected").val();
    var branch = $('#branch').val();
    var url = "http://9a5d5e5d.ngrok.io/automation";

    if (branch == '') {
        branch = 'integration';
    }
    var email = $('#email').val();

    var payload = {
        "apiName": apiName,
        "branch": branch,
        "email": email
    }
    console.log(payload);

    disableFields();
    $.ajax({
        type: 'POST',
        header: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        contentType: 'application/json',
        url: url,
        data: JSON.stringify(payload),
        success: function(data){
            console.log('success');
            console.log(data);
            $('#success-response').html(data['text']);
            $('#success-div').show();
            enableFields();
        },
        error: function(error) {
            console.log('error');
            var errorBody = error.responseJSON;
            console.log(errorBody.responseJSON);
            $('#error-response').html(errorBody['errorMessage']);
            $('#error-div').show();
            console.log(error.responseText); // @text = response error, it is will be errors: 324, 500, 404 or anythings else
            enableFields();
        }
    });
}


