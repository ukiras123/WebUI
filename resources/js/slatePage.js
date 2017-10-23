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

function hideLoading() {
    $("#loading").css('visibility', 'hidden');
}

function showLoading() {
    $("#loading").css('visibility', 'visible');
}


$('#regression-btn').click(function(event) {
    automate(event.target.id);
});

$('#smoke-test-btn').click(function(event) {
    automate(event.target.id);
});


function automate(id) {
    var automationLevel = 'smoke';
    if (id == 'regression-btn') {
        automationLevel = 'regression'
    }
    console.log(this)
    hideResponseMessage();
    console.log("Inside Ajax")

    var apiName = $('#api-name').find(":selected").val();
    var branch = $('#branch').val();
    var url = "http://503e2ffd.ngrok.io/automation";

    if (branch == '') {
        branch = 'integration';
    }
    var email = $('#email').val();

    var payload = {
        "apiName": apiName,
        "branch": branch,
        "email": email,
        "automationLevel": automationLevel
    }
    console.log(payload);

    disableFields();
    showLoading();
    $.ajax({
        type: 'POST',
        header: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        contentType: 'application/json',
        url: url,
        data: JSON.stringify(payload),
        success: function(data){
            hideLoading();
            console.log('success');
            console.log(data);
            $('#success-response').html('<a href='+data['text']+'>Click Here for Report</a>');
            $('#success-div').show();
            enableFields();
        },
        error: function(error) {
            hideLoading();
            console.log('error');
            console.log(error);
            if (!(error['status'] == '0')) {
                var errorBody = error.responseJSON;
                console.log(errorBody.responseJSON);
                $('#error-response').html(errorBody['errorMessage']);
                $('#error-div').show();
            } else
            {
                $('#error-response').html('Something went wrong. Please contact your administrator.');
                $('#error-div').show();
            }
            console.log(error.responseText); // @text = response error, it is will be errors: 324, 500, 404 or anythings else
            enableFields();
        }
    });
}


