jQuery(document).ready(function ($) {
    var $form_modal = $('.cd-user-modal'),
        $form_login = $form_modal.find('#cd-login'),
        $form_signup = $form_modal.find('#cd-signup'),
        $form_signup_success = $form_modal.find('#cd-success'),
        $form_forgot_password = $form_modal.find('#cd-reset-password'),
        $form_modal_tab = $('.cd-switcher'),
        $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
        $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
        $forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
        $back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
        $back_to_login_link2 = $form_signup_success.find('.cd-form-bottom-message a'),
        $success_message = $form_signup_success.find('#success-message'),
        $main_nav = $('.main-nav');
    $signup_form = $("#signup-form");
    //open modal
    $main_nav.on('click', function (event) {

        if ($(event.target).is($main_nav)) {
            // on mobile open the submenu
            $(this).children('ul').toggleClass('is-visible');
        } else {
            // on mobile close submenu
            $main_nav.children('ul').removeClass('is-visible');
            //show modal layer
            $form_modal.addClass('is-visible');
            //show the selected form
            ( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
        }

    });

    //close modal
    $('.cd-user-modal').on('click', function (event) {
        if ($(event.target).is($form_modal) || $(event.target).is('.cd-close-form')) {
            $form_modal.removeClass('is-visible');
        }
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $form_modal.removeClass('is-visible');
        }
    });

    //switch from a tab to another
    $form_modal_tab.on('click', function (event) {
        event.preventDefault();
        ( $(event.target).is($tab_login) ) ? login_selected() : signup_selected();
    });

    //hide or show password
    $('.hide-password').on('click', function () {
        var $this = $(this),
            $password_field = $this.prev('input');

        ( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
        ( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
        //focus and move cursor to the end of input field
        $password_field.putCursorAtEnd();
    });

    //show forgot-password form
    $forgot_password_link.on('click', function (event) {
        event.preventDefault();
        forgot_password_selected();
    });

    //back to login from the forgot-password form
    $back_to_login_link.on('click', function (event) {
        event.preventDefault();
        login_selected();
    });

    $back_to_login_link2.on('click', function (event) {
        event.preventDefault();
        login_selected();
    });

    function login_selected() {
        $form_login.addClass('is-selected');
        $form_signup.removeClass('is-selected');
        $form_forgot_password.removeClass('is-selected');
        $tab_login.addClass('selected');
        $tab_signup.removeClass('selected');
        $form_signup_success.removeClass('is-selected');
    }

    function signup_selected() {
        $form_login.removeClass('is-selected');
        $form_signup.addClass('is-selected');
        $form_forgot_password.removeClass('is-selected');
        $tab_login.removeClass('selected');
        $tab_signup.addClass('selected');
        $form_signup_success.removeClass('is-selected');
    }

    function forgot_password_selected() {
        $form_login.removeClass('is-selected');
        $form_signup.removeClass('is-selected');
        $form_forgot_password.addClass('is-selected');
        $form_signup_success.removeClass('is-selected');
    }

    function success_selected(name, user) {
        $success_message.html('Welcome '+capitalizeFirstLetter(name)+', you are now registered.<br><h1>UserName: '+user+'</h1>');
        $form_login.removeClass('is-selected');
        $form_signup.removeClass('is-selected');
        $form_forgot_password.removeClass('is-selected');
        $form_signup_success.removeClass('is-selected')
        $form_signup_success.addClass('is-selected');
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //REMOVE THIS - it's just to show error messages
    $form_login.find('input[type="submit"]').on('click', function (event) {
        event.preventDefault();
        var login_url = 'http://ec2-54-67-69-244.us-west-1.compute.amazonaws.com:8080/user/login'
        $form_login.find('input[type="text"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });

    function signupClear() {
        $form_signup.find('input[id="signup-username"]').val('');
        $form_signup.find('input[id="signup-firstname"]').val('');
        $form_signup.find('input[id="signup-lastname"]').val('');
        $form_signup.find('input[id="signup-email"]').val('');
        $form_signup.find('input[id="signup-password"]').val('');
        $form_signup.find('input[id="signup-jirauser"]').val('');
        $form_signup.find('input[id="signup-jirapass"]').val('');
    }


    $signup_form.on('submit', function (event) {

        event.preventDefault();
        var userName = $form_signup.find('input[id="signup-username"]').val();
        var firstName = $form_signup.find('input[id="signup-firstname"]').val();
        var lastName = $form_signup.find('input[id="signup-lastname"]').val();
        var email = $form_signup.find('input[id="signup-email"]').val();
        var password = $form_signup.find('input[id="signup-password"]').val();
        var jiraUser = $form_signup.find('input[id="signup-jirauser"]').val();
        var jiraPass = $form_signup.find('input[id="signup-jirapass"]').val();
        var signup_url = 'http://ec2-54-67-69-244.us-west-1.compute.amazonaws.com:8080/user/signup';
        var temp_signup_url = 'http://340a7d6f.ngrok.io/user/signup';
        var payload = {
            "userName": userName,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "jiraUser": jiraUser,
            "jiraPass": jiraPass
        }
        console.log(payload);
        $.ajax({
            type: 'POST',
            header: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            contentType: 'application/json',
            url: temp_signup_url,
            data: JSON.stringify(payload)
        }).then(function (result) {
            console.log('success');
            console.log(result);
            success_selected(result['firstName'], result['userName']);
            signupClear();
        });

    });


//credits https://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
    jQuery.fn.putCursorAtEnd = function () {
        return this.each(function () {
            // If this function exists...
            if (this.setSelectionRange) {
                // ... then use it (Doesn't work in IE)
                // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
                var len = $(this).val().length * 2;
                this.setSelectionRange(len, len);
            } else {
                // ... otherwise replace the contents with itself
                // (Doesn't work in Google Chrome)
                $(this).val($(this).val());
            }
        });
    };
});