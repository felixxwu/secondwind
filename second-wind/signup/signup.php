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
    // signup siccessful ###########################

    $hash = password_hash($password, PASSWORD_DEFAULT);
    sqlInsert("users", $username, $hash, $email);
    $id = sqlSelectFirstRow("users","`username` = '$username'","username")["id"];

    $randX = mt_rand() * 100 / mt_getrandmax();
    $randY = mt_rand() * 100 / mt_getrandmax();
    sqlInsert("locations", "NULL", $username, "1", $randX, $randY);

    sqlInsert("energy", "NULL", $username, "0", "0", "0", "0", "0");
    sqlInsert("resourceAllocation", $username, "0", "0", "0", "0", "0");

	echo "<script>
	saveUsername('$username');
    savePassword('$password');
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