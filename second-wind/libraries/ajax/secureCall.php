<?php
// include "../database/databaseFunctions.php";

include "libraries/items/combineItems.php";
// this file is where all the functions are stored for use in ajax.call
// each function is essentially accessable from js, meaning that js can call php code
// any output will be stored in ghost, which is invisible

if (isset($_POST["func"])) {

    // get the function name to be called
    $func = $_POST["func"];

    // remove "func", leaving only arguments
    unset($_POST["func"]);

    // show error if the function does not exist
    if (function_exists($func)) {
        $args = $_POST; // these are the rest of POST
        
        unset($args["username"]); // the username should not be an argument
        
        call_user_func_array($func, $args); // call the function using these arguments
    } else {
        echo "<script>console.error('call function " . $func . "() does not exist in call.php');</script>";
    }
}

################################################################################################################################
// functions go here...

// initiate a battle with a player
function startBattle($myIsland, $defender, $defenderIsland) {
    $username = $_POST["username"];

    // check if there are existing battles
    $criteria = "(`attacker` = '$username' AND `attackerIsland` = '$myIsland'
                AND `defender` = '$defender' AND `defenderIsland` = '$defenderIsland')
                OR (`attacker` = '$defender' AND `attackerIsland` = '$defenderIsland'
                AND `defender` = '$username' AND `defenderIsland` = '$myIsland')";
    $battle = sqlSelectFirstRow("battles", $criteria, "id");
    if ($battle) { return; }

    sqlInsert("battles", "NULL", $username, $defender, $myIsland, $defenderIsland, "1", "10", "10");    
}

// update whose turn it is in a battle
function endTurn($myIsland, $defender, $defenderIsland) {
    $username = $_POST["username"];
    $criteria = "(`attacker` = '$username' AND `attackerIsland` = '$myIsland'
                AND `defender` = '$defender' AND `defenderIsland` = '$defenderIsland')
                OR (`attacker` = '$defender' AND `attackerIsland` = '$defenderIsland'
                AND `defender` = '$username' AND `defenderIsland` = '$myIsland')";
    $battle = sqlSelectFirstRow("battles", $criteria, "id");
    jslog($battle);
    // turn 1 is the attacker's turn, so odd turns are attacker turns
    $turn = $battle["turn"];
    if ($turn % 2 == 0) {
        // defenders turn
        // check if you are the defender
        if (strSame($battle["defender"], $username) && ($battle["defenderIsland"] == $myIsland)) {
            sqlUpdate("battles", "`attacker` = '$defender' AND `attackerIsland` = '$defenderIsland'
            AND `defender` = '$username' AND `defenderIsland` = '$myIsland'", "turn", $turn + 1);
        }
    } else {
        // attackers turn
        // check if you are the attacker
        if (strSame($battle["attacker"], $username) && ($battle["attackerIsland"] == $myIsland)) {
            sqlUpdate("battles", "`attacker` = '$username' AND `attackerIsland` = '$myIsland'
            AND `defender` = '$defender' AND `defenderIsland` = '$defenderIsland'", "turn", $turn + 1);
        }
    }

}

// add a target to move towards
function addTarget($island, $x, $y) {
    $username = $_POST["username"];
    $criteria = "`username` = '$username' AND `island` = '$island'";
    $existingTarget = sqlSelectFirstRow("targetLocations",$criteria, "username");
    if ($existingTarget) {
        sqlUpdate("targetLocations", $criteria, "x", $x);
        sqlUpdate("targetLocations", $criteria, "y", $y);
    } else {
        sqlInsert("targetLocations","NULL", $username, $island, $x, $y);
    }

}


function startExtractionProcess($extractorName,$extractorLevel,$id){
    $username = $_POST["username"];
    $success= subtractQuantities($username,$extractorName,$extractorLevel);
    if($success){ //if user has the given extractor then start extraction process 
        sqlInsert("extractionProcesses","$id",$extractorLevel,$username);
    }
}

//submits the new energy allocation
function updateEnergyAllocation($human,$attack,$power,$intelligence,$building){
    $username=$_POST["username"];
    if (!sqlSelect("resourceAllocation","*","`username` = '$username'","`username`")[0]) {
        sqlInsert("resourceAllocation","$username", $human, $attack, $power, $intelligence, $building);
    } else {
        sqlUpdate("resourceAllocation","`username` = '$username'","human",$human);
        sqlUpdate("resourceAllocation","`username` = '$username'","power",$power);
        sqlUpdate("resourceAllocation","`username` = '$username'","attack",$attack);
        sqlUpdate("resourceAllocation","`username` = '$username'","intelligence",$intelligence);
        sqlUpdate("resourceAllocation","`username` = '$username'","building",$building);
    }
}

//combines el1IN and el2IN and update the database with the new item
function ajaxCombineItems($id,$el1IN,$level1IN,$el2IN,$level2IN){

    global $username, $test, $el1, $el2, $level1, $level2, $el1Result, $el2Result, $el1Amount, $el2Amount, $el1Energies, $el2Energies,$sumEnergies,$level,$ratio,$newItem,$newItemAmount;
    $el1=$el1IN;
    $el2=$el2IN;
    $level1=$level1IN;
    $level2=$level2IN;
    $username=$_POST["username"];
  
    getAmounts(); 
    enoughItems();
    subtractQuantities();
    startCombination($id,$el1,$el2,$level1,$level2,$username);
    // getEnergyValues();
    // newEnergyValues();
    // newRatio();
    // newItem();
}

//substracts relevant quantities from items in the server
//adds a combination process to the server (id corresponds to the id of the combination in the local combinationList)
//FUTURE the system is not checking if result item, combination time are legit values for the combining items...
function ajaxStartCombination($item1,$level1,$item2,$level2,$id,$startTime,$finishTime,$resultItem,$resultItemLevel){
    
    $username=$_POST["username"];

    //substract 1 from both items in the database
    $success1= subtractQuantities($username,$item1,$level1);
    $success2= subtractQuantities($username,$item2,$level2);

    //start combination process if you have enough items;
    if($success1 && $success2){
        sqlInsert("itemCombinations","$id","$username","$item1","$level1","$item2","$level2","$resultItem","$resultItemLevel","$startTime","$finishTime");
    }

}
//creates a new item when a combination is finished
function ajaxFinishCombination($id){
    $username=$_POST["username"];
    //checks the combination time is due
    $currentTime = time();
    $combinationInformation = sqlSelect("itemCombinations","*","user='$username' AND id = '$id'","id")[0];
    $finishTime=$combinationInformation['finish_time'];
    
    if($combinationInformation['finish_time']<=($currentTime+1)){
        //create new item
        newItem($username,$combinationInformation['result_item'],$combinationInformation['result_level']);

        //remove combination from list
        sqlDelete("itemCombinations","id = '$id'");
        
    }

}

function example() {
    echo "this is a test";
}

function argsExample($arg1, $arg2) {
    echo $arg1 . " " . $arg2 . " " . $_POST["username"];
}

?>