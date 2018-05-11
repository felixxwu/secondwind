<?php

$username = $_POST["username"];
$password = $_POST["password"];
$page = $_POST["page"];
unset($_POST["username"]);
unset($_POST["password"]);
unset($_POST["page"]);

if (verifyLogin($username, $password)) {
    include $page;
} else {
    die("login not verified");
}

function verifyLogin($username, $password) {
	$passwordHash = sqlSelect("users","*","`username` = '" . $username . "'", "`username`")[0]["password"];
	return password_verify($password, $passwordHash);
}

?>
