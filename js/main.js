function ajaxcall() {
    console.log("Inside Ajax")
    var name = $('#name').val();
    var message = $('#message').val();
    var link = $('#link').val();
    var default_icon = "https://lh3.googleusercontent.com/gVSWov6Hv9Vn7pA7eXvycJhWyvvN2AzDKzbdxRvvpnJMOLoHtbkhvEnK-qg7pUldyFH-4xZvWpmZAJIFue-CheN0O2IfRsw2O6lj5Z1Th73bCoAeEPI8soUDuaCugQ2ahSY8hShGsohJsvw8XzJHPMxJ7CpjbSgbxQf328vME_X8QQYnnaG4zt831L5h4dqQHCYwh8gYL3NzIyrquBLBMxQyPyS1Turx2XICRDKfYz3kj8POzPK_UCJBSvajMz2gMFupBkfdNwaZblFHu7TZBwLGmWNLo4xskT-hs29JN3w4NRqNVL4bRX9tCPF0SjlkLf7iLVnw4JfAMm8dY2ZZCE4docnJ3rw0bZ1rV0n-Je6tp9l4cuzVtdaIYCh-9gU1XX5c3TURk_3tgeWRFi03seHqNA4FvX80yBY1cjZHYz3NHgEjbwJLH3DdbxCemfBBELrAXv6BMDT0g-jPtaCddh53uXO9qgAyYg2OLPqFu-sAxt4HI7tpWpIFslf7jpLWIctMnFbt_A3UptRYek4kf8GmqyTBjxZ908BkUK3tF4kDsz9MKK_OWqu1hAbGEhAwpSopgjuE2BOT1PFm93gt83sZOeEwjLYFYUz1n3QMpqSAKIp9X0kSf-6EmwGhAmrjWwolKgTNN8D4q8CL5lh5pCvlP99tmoaDo58=w293-h250-no"
    var oceanx_icon_url = "https://lh3.googleusercontent.com/gQzJTIwghRjVhP3c1hfSHfk1uXcVVeUyTidWxBRsM1JBmrgZgqdFksaQ6L14FemXxJ7o1BBNbxVKCFl0asrE3oUS9xBSxUcUmfKHv1_axZO5jSf_HAXPyz9Rq32EvGXua8KkMZa-7A=w247-h230-no";
    var areEqual = name.toUpperCase() === "OCEANX";
    if (areEqual == true) {
        default_icon = oceanx_icon_url;
    }

    $warn = $('#warn');
    if (name != "" && message != "")
    {
        var payload = {
            'text': message + " " + link,
            'username': name,
            'icon_url': default_icon
        }
        kiran_bot_url: 'https://hooks.slack.com/services/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'
        generic_url: 'https://hooks.slack.com/services/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'

        $.ajax({
            type: 'POST',
            crossDomain: true,
            url: 'https://hooks.slack.com/services/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',
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