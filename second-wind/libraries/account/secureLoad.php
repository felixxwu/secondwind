<?php

// the php version of secure load helps the js file to check the credentials on the server
// if they do not match, the site will not be served, and a redirect to the login page will be served instead
chdir("../../");

// define("startTime", microtime(true));

include "libraries/database/databaseFunctions.php";
include "libraries/utility/general.php";

$username = $_POST["username"];
$password = $_POST["password"];

if (!$username || !$password) {
    echo "<script>window.location.href = 'login';</script>";
    // echo "<meta http-equiv='refresh' content='0; url=login' />";
    return;
}

$page = $_POST["page"];
// unset($_POST["username"]);
unset($_POST["password"]);
unset($_POST["page"]);

// error_log("start: 0 - $page");

if (verifyLogin($username, $password)) {
    include $page;
} else {
    $message = urlencode("wrong login details");
    echo "<meta http-equiv='refresh' content='0; url=login?message=$message' />";
    
}

function verifyLogin($username, $password) {
    $passwordHash = sqlSelect("users","*","`username` = '" . $username . "'", "`username`")[0]["password"];
    // error_log("before verify: " . (microtime(true) - startTime));
    $verified = password_verify($password, $passwordHash);
    // error_log("after verify: " . (microtime(true) - startTime));
	return $verified;
}


$conn->close();
// error_log("end: " . (microtime(true) - startTime));
// error_log(" ");

?>
