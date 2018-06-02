<?php

function canBattle($attacker, $attackerIsland, $defender, $defenderIsland) {
    $distanceToBattle = 5;
    
    $attackerLocation = sqlSelectFirstRow("locations", "`username` = '$attacker' AND `island` = '$attackerIsland'", "id");
    $defenderLocation = sqlSelectFirstRow("locations", "`username` = '$defender' AND `island` = '$defenderIsland'", "id");
    $distance = distance($attackerLocation["x"], $attackerLocation["y"], $defenderLocation["x"], $defenderLocation["y"]);
    if ($distance < $distanceToBattle) {
        return true;
    } else {
        return false;
    }
}

?>