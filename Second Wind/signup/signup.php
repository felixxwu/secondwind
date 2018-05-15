<?php

include "../libraries/database/databaseFunctions.php";

$username = $_POST["username"];

$email = $_POST["email"];
$password = $_POST["password"];

// check if any users already have this username
if (!validUsername($username)) {
    echo "please only use a-z, A-Z, 0-9 for your username";
} else if (sqlSelect("users","*","`username` = '" . $username . "'", "`username`")) {
    // error
    echo "this username has already been taken";
} else {
    $hash = password_hash($password, PASSWORD_DEFAULT);
    sqlInsert("users", "NULL", $username, $hash, $email);
    $id = sqlSelectSingle("users","`username` = '$username'","id");
	echo "<script>
	saveUsername('" . $username . "');
    savePassword('" . $password . "');
    window.location.href = '../';
	</script>";
}

function validUsername($username) {
    $validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $chars = str_split($username);
    foreach ($chars as $char) {
        // if char is not found in valid chars
        if (strpos($validChars, $char) === false) {
            return false;
        }
    }
    return true;
}

?>