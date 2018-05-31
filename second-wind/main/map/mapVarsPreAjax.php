<?php

// BEFORE THE FIRST AJAX LOOP CALL THERE ARE NO VARIABLES
// THIS FILE PROVIDES NECESSARY VARIABLES FOR THE MAP BEFORE THE FIRST AJAX LOOP CALL 

$otherIslands = sqlSelect("locations", "`username`,`island`,`x`,`y`", "NOT `username` = '" . $_POST["username"] . "'", "id");
echoAsVar("otherIslands", $otherIslands);

$myIslands = sqlSelect("locations", "`island`,`x`,`y`", "`username` = '" . $_POST["username"] . "'", "island");
echoAsVar("myIslands", $myIslands);

$myTargets = sqlSelect("targetLocations", "*", "`username` = '" . $_POST["username"] . "'", "id");
echoAsVar("myTargets", $myTargets);

?>
