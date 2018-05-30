<?php
$targets = sqlSelect("targetLocations", "*", "true", "id");

foreach ($targets as $target) {
        
    $username = $target["username"];
    $island = $target["island"];
    $criteria = "`username` = '$username' AND `island` = '$island'";
    $location = sqlSelectFirstRow("locations", $criteria, "username");
    
    // if there is no target, do nothing
    if (!$target) {
        return;
    }
    
    $x1 = $location["x"]; // current x
    $y1 = $location["y"]; // current y
    $x2 = $target["x"]; // target x
    $y2 = $target["y"]; // target y
    
    $step = 1;  // distance moved for each iteration
    
    $distance = sqrt( pow($x2 - $x1, 2) + pow($y2 - $y1, 2) );  // standard euclidean distance
    
    if ($distance < $step) {
        sqlUpdate("locations", $criteria, "x", $x2);
        sqlUpdate("locations", $criteria, "y", $y2);
        sqlDelete("targetLocations", $criteria);
        return;
    }
    
    // step / distance = xincrement / (x2 - x1) = yincrement / (y2 - y1)
    // so:
    $xIncrement = ($x2 - $x1) * $step / $distance;
    $yIncrement = ($y2 - $y1) * $step / $distance;
    
    sqlUpdate("locations", $criteria, "x", $x1 + $xIncrement);
    sqlUpdate("locations", $criteria, "y", $y1 + $yIncrement);
        
}

?>