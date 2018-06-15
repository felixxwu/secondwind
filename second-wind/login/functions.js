// the functions accompanying the login page

// requires libraries/account/functions.js

window.onload = function () {
    element("username").focus();

    // link the enter button to these input boxes
    linkKey("username", 13, function () {
        $("#login").click();
    });
    linkKey("password", 13, function () {
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
