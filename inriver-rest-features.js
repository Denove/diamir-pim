var baseUrl = "https://apieuw.productmarketingcloud.com/api/v1.0.0/";
var useFallbackApiKey = false;


function determineAuthenticationMethod() {
    $.getJSON(myAjax("model/languages", null, "GET", false)).fail(function() {
        useFallbackApiKey = true;
    }).always(function() {
        console.log(useFallbackApiKey ? "Using ApiKey for authentication" : "Using ApiKey less authentication");
    });
}

function $myAjax(restOperation, data = null, method = "GET", asyncOperation = true) {
    var ajaxSettings = {
        dataType: "json",
        contentType: 'application/json',
        url: baseUrl + restOperation,
        processData: true,
        type: method,
        async: asyncOperation
    };

    if(data != null) {
        ajaxSettings.data = JSON.stringify(data);
    }

    if (useFallbackApiKey) {
        ajaxSettings.headers = {
            'X-inRiver-APIKey': restApiKey,
            'Accept': 'application/json',
            'Accept-Language': language
        };
    } else {
        ajaxSettings.xhrFields = {
            withCredentials: true
        };
        ajaxSettings.crossDomain = true;
        ajaxSettings.headers = {
            'Accept': 'application/json',
            'Accept-Language': language
        };
    }

//            console.log(ajaxSettings);
    return ajaxSettings;
}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}


