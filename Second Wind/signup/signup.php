<?php

$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];

// check if any users already have this username
if (sqlSelect("users","*","`username` = '" . $username . "'", "`username`")) {
    // error
    echo "<script>
    element('message').innerHTML = 'this username has already been taken';
    </script>";
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