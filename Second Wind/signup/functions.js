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

function checkUserExists() {
    let username = element("username").value;
    let ajax = new AjaxHelper("../libraries/ajax");
    ajax.loadVariables("ghost", { "message": username }, function () {
        element("message").innerHTML = message;
        console.log(message);
    });
}