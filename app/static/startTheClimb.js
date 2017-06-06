function startTheClimb() { 
    // POST to create new collection
    $.post(
        "/collection",
        $.param({
            "topLevelTargets": basecamp_mei_file
        })
    ).done(function(data, textStatus, xhr) { 
        // POST to collection's createAnnoStateUri
        createAnnoStateUri = $.parseHTML(data)[0].getAttribute("href");
        $.post(
            createAnnoStateUri
        ).done(function(data, textStatus, xhr) { 
            // open new annostate in viewer
            window.location.href = baseuri + "/viewer?annostate=" + xhr.getResponseHeader("Location");
        });
    });
}

// autoload?
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var autoload = getParameterByName('load')!==null;
if (autoload) {
	console.log('auto-load');
	setTimeout(startTheClimb, 1000);
} else {
	console.log('no auto-load');
}