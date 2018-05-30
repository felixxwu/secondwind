<?php

$islands = sqlSelect("locations", "`island`,`x`,`y`", "`username` = '" . $_POST["username"] . "'", "island");
echoAsVar("islands", $islands);

$targets = sqlSelect("targetLocations", "*", "`username` = '" . $_POST["username"] . "'", "id");
echoAsVar("myTargets", $targets);

?>