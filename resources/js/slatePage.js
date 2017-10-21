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