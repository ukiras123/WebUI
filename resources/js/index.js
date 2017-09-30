function ajaxcall() {
    console.log("Inside Ajax")
    var name = $('#name').val();
    var message = $('#message').val();
    var link = $('#link').val();
    var oceanx_icon_url = "https://lh3.googleusercontent.com/gQzJTIwghRjVhP3c1hfSHfk1uXcVVeUyTidWxBRsM1JBmrgZgqdFksaQ6L14FemXxJ7o1BBNbxVKCFl0asrE3oUS9xBSxUcUmfKHv1_axZO5jSf_HAXPyz9Rq32EvGXua8KkMZa-7A=w247-h230-no";
    var default_icon = "https://previews.123rf.com/images/martialred/martialred1511/martialred151100007/47998755-Eye-of-providence-or-all-seeing-eye-of-God-flat-icon-for-apps-and-websites-Stock-Vector.jpg";
    var default_url = "https://hooks.slack.com/services/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"
    var kiran_url = "https://hooks.slack.com/services/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"
    var peter_icon = "https://goo.gl/v1onND"
    var areEqual = name.toLowerCase() === "oceanx";
    if (areEqual == true) {
        default_icon = oceanx_icon_url;
    }
    if (areEqual = name.toLowerCase() == "ppanec_ocx")
    {
        console.log("ppanec_ocx")
        default_icon = peter_icon;
    }
    var payload = {
        'text': message + " " + link,
        'username': name,
        "icon_url": default_icon
    }
    console.log(payload);
    if (message == "" && name == "") {
        $('#name').css('border-color','red');
        $('#message').css('border-color','red');
    } else if (name == "") {
        $('#message').css('border-color','');
        $('#name').css('border-color','red');
    } else if (message == "") {
        $('#name').css('border-color','');
        $('#message').css('border-color','red');
    } else {
        $('#message').css('border-color','').val('');
        $('#name').css('border-color','').val('');
        $('#link').css('border-color','').val('');
        $.ajax({
            type: 'POST',
            url: kiran_url,
            data: JSON.stringify(payload),
            header: { 'Content-Type': 'application/json' }
        }).then(function(result) {
            console.log('success');
            console.log(result);
        }, function(error) {
            console.log(error);
        });
    }
}

$('input').click(function() {
    var status = $(this).val();
    console.log(status)
    if (status == 'on') {
        showQuote();
    } else {
        $('#quote').hide();
    }
});

function showQuote()
{
    console.log("showQuote")
    $.ajax({
        url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        type: 'GET',
        header: { 'Content-Type': 'application/json' },
        success: function(data) {
            var post = data.shift();
            var quote = post.content;
            $('#quote').html(quote);
            $('#quote').show();
            animateQuote();
        },
        cache: false
    });
}

function animateQuote() {
    var text = $(".split");
    var split = new SplitText(text);

    function random(min, max) {
        return (Math.random() * (max - min)) + min;
    }

    $(split.chars).each(function(i) {
        TweenMax.from($(this), 2.5, {
            opacity: 0,
            x: random(-500, 500),
            y: random(-500, 500),
            z: random(-500, 500),
            scale: .1,
            delay: i * .01,
            yoyo: true,
            repeat: -1,
            repeatDelay: 10
        });
    });
}