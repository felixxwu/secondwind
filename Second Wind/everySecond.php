<?php 

$allocation = sqlSelectFirstRow('resourceAllocation',"`username`='test'",'username');
$currentEnergy = sqlSelectFirstRow('energy',"`username`='test'",'username');

//updates each row in the energy table by adding the current energy and the allocation
sqlUpdate('energy', "`username`='test'", 'human', ($allocation['human'] + $currentEnergy['human']));
sqlUpdate('energy', "`username`='test'", 'attack', ($allocation['attack'] + $currentEnergy['attack']));
sqlUpdate('energy', "`username`='test'", 'power', ($allocation['power'] + $currentEnergy['power']));
sqlUpdate('energy', "`username`='test'", 'intelligence', ($allocation['intelligence'] + $currentEnergy['intelligence']));
sqlUpdate('energy', "`username`='test'", 'building', ($allocation['building'] + $currentEnergy['building']));

?>
