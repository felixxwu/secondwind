<?php

// the php version of secure load helps the js file to check the credentials on the server
// if they do not match, the site will not be served, and a redirect to the login page will be served instead

include "../database/databaseFunctions.php";
include "../utility/general.php";

$username = $_POST["username"];
$password = $_POST["password"];

if (!$username || !$password) {
    echo "<meta http-equiv='refresh' content='0; url=login' />";
    return;
}

$page = $_POST["page"];
unset($_POST["username"]);
unset($_POST["password"]);
unset($_POST["page"]);

if (verifyLogin($username, $password)) {
    include "../../" . $page;
} else {
    $message = urlencode("wrong login details");
    echo "<meta http-equiv='refresh' content='0; url=login?message=$message' />";

}

function verifyLogin($username, $password) {
	$passwordHash = sqlSelect("users","*","`username` = '" . $username . "'", "`username`")[0]["password"];
	return password_verify($password, $passwordHash);
}

?>
