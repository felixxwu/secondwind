// general untility functions for js

function log(log) {
    console.log(log);
}

function link(id, keycode, action) {
    $("#" + id).keyup(function (event) {
        if (event.keyCode === keycode) {
            action();
        }
    });
    log("linked " + id + " with keycode: " + keycode + " and action: " + action);
}

function element(id) {
    return document.getElementById(id);
}

function classes(id) {
    return document.getElementsByClassName(id);
}

function showError(message) {
    show("errorContainer", "fadeIn", 1);
    
    element("error").innerHTML = "<h3>Error:</h3>";
    element("error").innerHTML += message + "<br><br>";

    let close = document.createElement("a");
    close.setAttribute("onclick", "hide('errorContainer', 'fadeOut', 1)");
    close.classList.add("button");
    close.innerHTML = "close";
    element("error").appendChild(close);
}