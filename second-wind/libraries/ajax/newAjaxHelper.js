// SETUP ##############################################################

// Link jquery and ajax libraries:
// script(src="https://code.jquery.com/jquery-3.2.1.min.js")
// script(src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js")

// Initialise a new AjaxHelper 
// var ajax = new AjaxHelper("path");
// "path" is the relative filepath to this directory 

// USAGE ###############################################################

// To load a php page into a div (getting an output from the server)
// ajaxSecureLoad("id","page.php", {"arg1": "value","arg2": 100}, function(){
//     console.log("load done");
// });

// To call a php function (execute php without output)
// ajaxSecureCall("functionName", {"arg1": "value", "arg2": 200}, function(){
//     console.log("call done");
// });

// To load variables from the server (and also execute function using those immediately)
// ... with no arguments
// ajaxSecureLoadVariables("id", {"var1": null, "var2": null}, function() {
//     console.log(var1);
//     console.log(var2);
// })
// ... with 1 argument
// ajaxSecureLoadVariables("id", {"var1": "arg", "var2": "arg"}, function() {
//      console.log(var1);
//      console.log(var2);
// })
// ... with multiple arguments
// ajaxSecureLoadVariables("id", {"var1": ["arg1","arg2","arg3"], "var2": "arg"}, function() {
//     console.log(var1);
//     console.log(var2);
// })

// Use undefined if you don't need arguments (does not apply to loadVariables)

var ajaxPath = "libraries/ajax";

function ajaxLoad(id, page, args, callback) {
    //console.log("loading " + page + " into #" + id + " with args: ", args);

    if (ajaxCountID(id) != 1) {
        console.warn("there are " + ajaxCountID(id) + " number of elements with ID: " + id);
    }

    // console.log("using new ajax");

    if (typeof callback == "undefined") {
        $("#" + id).load(page, args);      // load without callback if not defined
    } else {
        $("#" + id).load(page, args, function(response, status, jqXHR){   // load with callback

            // if there is an error, retry the request unit there is no error (with 1 second between each request)
            if (status == "error") {
                show("connectionError", "fadeInDown", 1);
                
                setTimeout(() => {
                    ajaxLoad(id, page, args, callback);
                }, 2000);
                return;
            }

            hide("connectionError", "fadeOutUp", 1);
            callback(response, status, jqXHR);
            
        });
    }
}

// DEPRICATED ####################################################################################
function ajaxCall(func, args, callback) {
    var newArgs = Object.assign({"func": func}, args);  // add func as an arg in args
    // call has a list of functions that will be called according to func
    ajaxLoad("ghost", ajaxPath + "/call.php", newArgs, callback); // load call to ghost
}

function ajaxLoadVariables(id, variables, callback) {
    ajaxLoad(id, ajaxPath + "/variables.php", variables, callback); // load call to ghost
}

function ajaxCountID(id) {
    return $("[id=" + id + "]").length;
}
//#################################################################################################



function secureLoad(id, page, args, callback) {
    var username = getUsername();
    var password = getPassword();

    // replace page with secureload php
    var newArgs = Object.assign({"username": username, "password": password, "page": page}, args);
    ajaxLoad(id, "libraries/account/secureLoad.php", newArgs, callback);
}

function ajaxSecureCall(func, args, callback) {
    var newArgs = Object.assign({"func": func}, args);

    secureLoad("ghost", ajaxPath + "/secureCall.php", newArgs, callback);
}

function ajaxSecureLoadVariables(id, variables, callback) {
    secureLoad(id, ajaxPath + "/secureVariables.php", variables, callback);
}
