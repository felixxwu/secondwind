<?php 

$allocation = sqlSelectFirstRow('resourceAllocation',"`username`='test'",'username');
$currentEnergy = sqlSelectFirstRow('energy',"`username`='test'",'username');

//updates each row in the energy table by adding the current energy and the allocation
sqlUpdate('energy', "`username`='test'", 'human', ($allocation['human'] + $currentEnergy['human']));
sqlUpdate('energy', "`username`='test'", 'attack', ($allocation['attack'] + $currentEnergy['attack']));
sqlUpdate('energy', "`username`='test'", 'power', ($allocation['power'] + $currentEnergy['power']));
sqlUpdate('energy', "`username`='test'", 'intelligence', ($allocation['intelligence'] + $currentEnergy['intelligence']));
sqlUpdate('energy', "`username`='test'", 'building', ($allocation['building'] + $currentEnergy['building']));

include "move.php";

// error_log(microtime(true));

//generate new source if limit of sources hasnt been reached
if(mt_rand(1,100)==1){
    //location of source
    $x=mt_rand(10,90);
    $y=mt_rand(10,90);

    //id of source
    $id = uniqid("id-");

    //type of energy
    $energyTypeNum=mt_rand(1,5);
    $energyType;
    switch($energyTypeNum){
        case 1: $energyType="human"; break;
        case 2: $energyType="attack"; break;
        case 3: $energyType="power"; break;
        case 4: $energyType="intelligence"; break;
        case 5: $energyType="building"; break;
    }
    
    //max rate of energy draining
    $maxRate=mt_rand(5,1000);
    //total amount of energy in source
    $totalAmount=mt_rand($maxRate*10,$maxRate*10000);

    //create entry in database
    sqlInsert('sources',$x,$y,$id,$energyType,$maxRate,$totalAmount);
}

?>
