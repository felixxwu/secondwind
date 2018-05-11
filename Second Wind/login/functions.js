window.onload = function() {
    element("username").focus();
    
    // link the enter button to these input boxes
    link("username", 13, function() {
        $("#login").click();
    });
    link("password", 13, function() {
        $("#login").click();
    });
}

var usernameLabel = "secondwind-username";
var passwordlabel = "secondwind-password";

function login() {
    $username = element("username").value;
    $password = element("password").value;
    saveUsername($username);
    savePassword($password);
    window.location.href = "../";
}

function saveUsername(username) {
    localStorage.setItem(usernameLabel, username);
}

function savePassword(password) {
    localStorage.setItem(passwordlabel, password);
}
