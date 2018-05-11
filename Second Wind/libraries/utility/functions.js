function log(log) {
    console.log(log);
}

function link(id, keycode, action) {
    $("#" + id).keyup(function(event) {
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

function getUsername() {
    return localStorage.getItem("enershitUsername");
}

function getPassword() {
    return localStorage.getItem("enershitPassword");
}