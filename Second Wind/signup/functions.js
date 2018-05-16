// functions specifically for the signup page

window.onload = function () {
    document.getElementById("username").focus();

    // link the enter button to the following input boxes
    link("username", 13, function () {
        $("#signup").click();
    });
    link("email", 13, function () {
        $("#signup").click();
    });
    link("password", 13, function () {
        $("#signup").click();
    });
}

function signup() {
    let username = element("username").value;
    let email = element("email").value;
    let password = element("password").value;
    element("message").innerHTML = "signing up...";
    let ajax = new AjaxHelper("../libraries/ajax");
    ajax.load("message", "signup.php", {
        "username": username,
        "email": email,
        "password": password
    });
}

var timeout;

function checkUserExists() {
    // timeout lets you delay a function, cleartimeout cancels the previous timeouts which means you can renew the timer
    element("message").innerHTML = "...";
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        let username = element("username").value;
        console.log("start " + username);
        let ajax = new AjaxHelper("../libraries/ajax");
        ajax.loadVariables("ghost", { "message": username }, function () {
            element("message").innerHTML = message;
            console.log("done  " + username);
            if (element("username").value != username) {
                checkUserExists();
            }
        });
    }, 500);
}