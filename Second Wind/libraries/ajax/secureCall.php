<?php
// include "../database/databaseFunctions.php";

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
function combineItems($el1IN,$level1IN,$el2IN,$level2IN){

    global $username, $test, $el1, $el2, $level1, $level2, $el1Result, $el2Result, $el1Amount, $el2Amount, $el1Energies, $el2Energies,$sumEnergies,$level,$ratio,$newItem,$newItemAmount;
    $el1=$el1IN;
    $el2=$el2IN;
    $level1=$level1IN;
    $level2=$level2IN;
    $username=$_POST["username"];
    include "../items/combineItems.php";
  
    getAmounts(); 
    enoughItems();
    startCombination($el1,$el2,$level1,$level2,$username);
    subtractQuantities();
    getEnergyValues();
    newEnergyValues();
    newRatio();
    newItem();
}

function example() {
    echo "this is a test";
}

function argsExample($arg1, $arg2) {
    echo $arg1 . " " . $arg2 . " " . $_POST["username"];
}

?>