<?php
echo "php started";
$enemyUnits = array();
$ownUnits = array();
class Unit
{
public $defenseFunction;
public function __construct($healthPoints, $level, $attackCost, $facingDirection, $idleImgFront, $moveImgFront, $idleImgBack, $moveImgBack, $stepCost, $location, $attackFunction, $defenseFunction) {
$this->healthPoints = $healthPoints;
$this->level = $level;
$this->attackCost = $attackCost;
$this->facingDirection = $facingDirection;
$this->idleImgFront = $idleImgFront;
$this->moveImgFront = $moveImgFront;
$this->idleImgBack = $idleImgBack;
$this->moveImgBack = $moveImgBack;
$this->stepCost = $stepCost;
$this->location = $location;
$this->attackFunction = $attackFunction;
$this->defenseFunction = $defenseFunction;
}
public function move($location) use (&$enemyUnits, &$ownUnits) {
$direction = null;
if ($this->location->y > $location->y) {
$direction = "forward";
}if ($this->location->y < $location->y) {
$direction = "backward";
}$validMove = false;
if ($this->location->x == $location->x && $this->location->y == $location->y + 1) {
$validMove = true;
}if ($this->location->x == $location->x && $this->location->y == $location->y - 1) {
$validMove = true;
}if ($this->location->x == $location->x + 1 && $this->location->y == $location->y) {
$validMove = true;
}if ($this->location->x == $location->x - 1 && $this->location->y == $location->y) {
$validMove = true;
}if (!$this->location && isSpawnTile($location)) {
$validMove = true;
}$enemyUnits->forEach(function ($enemy) use (&$location) {
if ($enemy->location) {
if ($enemy->location->x == $location->x && $enemy->location->y == $location->y) {
$console->error('invalid move as there is a unit in the target location');
$validMove = false;
}}}
);
$ownUnits->forEach(function ($unit) use (&$location) {
if ($unit->location) {
if ($unit->location->x == $location->x && $unit->location->y == $location->y) {
$console->error('invalid move as there is a unit in the target location');
$validMove = false;
}}}
);
if ($validMove) {
if ($this->facingDirection == "forward") {
$cachedAnimation = $this->idleImgBack;
}if ($this->facingDirection == "backward") {
$cachedAnimation = $this->idleImgFront;
}if ($direction == "forward") {
$unit->src = $this->moveImgBack;
}if ($direction == "backward") {
$unit->src = $this->moveImgFront;
}if ($direction == null) {
if ($this->facingDirection == "forward") {
$unit->src = $this->moveImgBack;
}if ($this->facingDirection == "backward") {
$unit->src = $this->moveImgFront;
}}$this->location = $location;
}}
public function attack($location) use (&$enemyUnits) {
$enemyUnits->forEach(function ($enemy) use (&$location) {
if ($enemy->location->x == $location->x && $enemy->location->y == $location->y) {
$this->attackFunction($enemy);
}}
);
}
public function die() {
}

}
class shitTroop extends Unit
{
public function __construct($location, $level, $facingDirection) {
function shitAttack($enemy) {
$attackDamage = 5;
$enemy->defenseFunction($this->level * $attackDamage);
}
function shitDefense($damage) {
$this->healthPoints = $this->healthPoints - $damage;
if ($this->healthPoints <= 0) {
$id = "unit-at-" + $this->location->x + "-" + $this->location->y;
log($id);
removeUnit($id);
$this->location = $undefined;
}}
parent(10 * $level, $level, 1, $facingDirection, "main/minigame/units/shitUnitIdleFront.svg", "main/minigame/units/shitUnitMoveFront.svg", "main/minigame/units/shitUnitIdleBack.svg", "main/minigame/units/shitUnitMoveBack.svg", 1, $location, $shitAttack, $shitDefense);
}

}
$goodShit = new shitTroop(array("x" => 1, "y" => 4), 1, 'forward');
$badShit = new shitTroop(array("x" => 1, "y" => 2), 1, 'backward');
array_push($ownUnits, $goodShit);
array_push($enemyUnits, $badShit);
array_push($ownUnits, new shitTroop($undefined, 1, 'forward'));
array_push($ownUnits, new shitTroop($undefined, 1, 'forward'));

var_dump($ownUnits);

?>