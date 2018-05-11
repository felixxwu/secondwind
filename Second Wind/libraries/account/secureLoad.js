// requires libraries/account/functions.js
// requires libraries/utitlity/functions.js

function secureLoad(id, page, args, callback) {
    var ajax = new AjaxHelper("libraries/ajax");
    console.log(ajax);
    var username = getUsername();
    var password = getPassword();
    var newArgs = Object.assign({"username": username, "password": password, "page": page}, args);
    ajax.load(id, "libraries/account/secureLoad.php", newArgs, callback);
}