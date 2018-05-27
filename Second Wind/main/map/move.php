<?php

$username = "test";
$location = sqlSelectFirstRow("locations","`username` = '$username'","username");



?>