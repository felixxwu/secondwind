<?php

include "../libraries/database/databaseFunctions.php";

$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];

// check if any users already have this username
if (sqlSelect("users","*","`username` = '" . $username . "'", "`username`")) {
    // error
    echo "this username has already been taken";
} else {
    $hash = password_hash($password, PASSWORD_DEFAULT);
	sqlInsert("users", $username, $hash, $email);
	echo "<script>
	saveUsername('" . $username . "');
    savePassword('" . $password . "');
    window.location.href = '../';
	</script>";
}

?>