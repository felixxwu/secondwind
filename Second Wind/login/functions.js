// the functions accompanying the login page

// requires libraries/account/functions.js

window.onload = function () {
    element("username").focus();

    // link the enter button to these input boxes
    link("username", 13, function () {
        $("#login").click();
    });
    link("password", 13, function () {
        $("#login").click();
    });

    element("username").value = localStorage.getItem(usernameLabel);
    element("password").value = localStorage.getItem(passwordLabel);
}

function login() {
    var username = element("username").value;
    var password = element("password").value;
    if (!username || !password) {
        element("message").innerHTML = "some login details are empty";
    } else {
        saveUsername(username);
        savePassword(password);
        window.location.href = "../";
    }
}

function saveUsername(username) {
    localStorage.setItem(usernameLabel, username);
}

function savePassword(password) {
    localStorage.setItem(passwordLabel, password);
}
