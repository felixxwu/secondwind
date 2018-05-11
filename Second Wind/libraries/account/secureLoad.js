// requires libraries/account/functions.js
// requires libraries/utitlity/functions.js

function secureLoad(id, page, args, callback) {
    var ajax = new AjaxHelper("../ajax");
    console.log(ajax);
    var username = getUsername();
    var password = getPassword();
    var newArgs = Object.assign({"username": username, "password": password,}, args);
    ajax.load(id, "secureLoad.php", newArgs, callback);
}