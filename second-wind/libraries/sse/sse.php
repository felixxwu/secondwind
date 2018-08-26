<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

include "../database/databaseFunctions.php";

define("username", $_GET["user"]);

$outputs = array(
    "myIslands",
    "otherIslands",
    "myTargets",
    "ajaxSources",
    "myBattles",
    "energies"
);

$dataAssoc = array();

foreach ($outputs as $output) {
    $dataAssoc[$output] = call_user_func($output);
}
echo "data: " . json_encode($dataAssoc) . "\n\n";

flush();

$conn->close();



function myIslands() {
    $islands = sqlSelect("locations", "`island`,`x`,`y`", "`username` = '" . username . "'", "id");
    return $islands;
}

function otherIslands() {
    $islands = sqlSelect("locations", "`username`,`island`,`x`,`y`", "NOT `username` = '" . username . "'", "id");
    return $islands;
}

function myTargets() {
    $targets = sqlSelect("targetLocations", "*", "`username` = '" . username . "'", "id");
    return $targets;
}

function ajaxSources(){
    return sqlSelectWithoutCriteria("sources", "*","id"); 
}

function myBattles() {
    $myBattles = sqlSelect("battles", "*", "`attacker` = '" . username . "' OR `defender` = '" . username . "'", "id");
    return $myBattles;
}

function energies(){
    $rows = 'human, attack, power, intelligence, building';
    $query = sqlSelect('energy',$rows,"username='" . username . "'","`username`")[0];
    return $query;
}

?>