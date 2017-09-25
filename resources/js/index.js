function ajaxcall() {
    console.log("Inside Ajax")
    var name = $('#name').val();
    var message = $('#message').val();
    var link = $('#link').val();
    var oceanx_icon_url = "https://lh3.googleusercontent.com/gQzJTIwghRjVhP3c1hfSHfk1uXcVVeUyTidWxBRsM1JBmrgZgqdFksaQ6L14FemXxJ7o1BBNbxVKCFl0asrE3oUS9xBSxUcUmfKHv1_axZO5jSf_HAXPyz9Rq32EvGXua8KkMZa-7A=w247-h230-no";
    var default_icon = "https://previews.123rf.com/images/martialred/martialred1511/martialred151100007/47998755-Eye-of-providence-or-all-seeing-eye-of-God-flat-icon-for-apps-and-websites-Stock-Vector.jpg";
    var default_url = "https://hooks.slack.com/services/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"
    var kiran_url = "https://hooks.slack.com/services/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"
    var peter_icon = "https://lh3.googleusercontent.com/5Fh7tjuEUeguHxnn7cHWMi9EbzrueGIzCSb9L4_-puSDR00JDpsfysFR1i7e_JVnTkLsalSpz-H-bigrFvxL053ylEh5CQXTGPN9tVARnr5pKBF2AAipjYP8WpnMROL17s5amKh7G1F2B3owpmcV4CFCnofPWAg8NA_ASfd3S1uxVYBqqCY4GgfoIKLk1vPuSdtu5LQw2_1apf3EA1isD9eX3lkHN_x0YZ0t_mkw5hYDzIPXldtdp9Zso1iNPIPfofdkbEG3eVjiOvWU1nNtkG7ix-hIBD1ItBxb0FfLI3fDhfXJsq2BZlHH8fac_iDCK6Cy7IOZe7KX0LH0m1sA2twi8LVTo8lzIO_ohY0HgEzDiHo-dccwOH9DQsh8DcxK3BmU3Y2xKbcXqN3Xe6mmRJo9JL8_x7bA-l6k6AF5Um5_3ULglkBjohyymTsRYQuN0Mt-PC3o595Dk6f5_nJaqn1rNgx5lPBQBpFWCFKAVqaKpBIAdC5eSNxizwjxfLi3eCFWwKoXt-AYtIA9M_2uFmCxC2tr16APWw3CJ7d12eeCaiFygO-xJCKUvQxoFfoJZzcrHB8WW8-q2ns4Y55fsoN8OydPX3nu7WYW406z_qrpcrC-OJngjDDMfKLO9oQC53vlxOyDxH906QT3QSyF2ma9mvqbLE671dM=w810-h798-no";

    var areEqual = name.toLowerCase() === "oceanx";
    if (areEqual == true) {
        default_icon = oceanx_icon_url;
    }
    if (areEqual = name.toLowerCase() == "ppanec_ocx")
    {
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
            url: default_url,
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