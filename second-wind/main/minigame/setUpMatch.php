<?php

include "libraries/legalChecks/minigame.php";
include "libraries/legalChecks/movement.php";

$username = $_POST["username"];
$myIsland = $_POST["myIsland"];
$player = $_POST["player"];
$playerIsland = $_POST["island"];

if (!canBattle($username, $myIsland, $player, $playerIsland)) {
    echo "You must move closer to <b>" . $player . "</b> in order to start a match with them";
    echo "<script>
    showError('You must move closer to <b>" . $player . "</b> in order to start a match with them');
    hide('minigame', 'fadeOut', 2);
    </script>";
    return;
}

echo "Playing against <b>" . $player . "</b>";
?>