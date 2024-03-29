<?php
include "../database/databaseFunctions.php";

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
        call_user_func_array($func, $args); // call the function using these arguments
    } else {
        echo "<script>console.error('call function " . $func . "() does not exist in call.php');</script>";
    }
}

// functions go here...

//submits the new energy allocation
function updateEnergyAllocation($human,$attack,$power,$intelligence,$building){
 
    if (!sqlSelect("resourceAllocation","*","`username` = 'test'","`username`")[0]) {
        sqlInsert("resourceAllocation","test", $human, $attack, $power, $intelligence, $building);
    } else {
        sqlUpdate("resourceAllocation","`username` = 'test'","human",$human);
        sqlUpdate("resourceAllocation","`username` = 'test'","power",$power);
        sqlUpdate("resourceAllocation","`username` = 'test'","attack",$attack);
        sqlUpdate("resourceAllocation","`username` = 'test'","intelligence",$intelligence);
        sqlUpdate("resourceAllocation","`username` = 'test'","building",$building);
    }
}

//combines el1IN and el2IN and update the database with the new item
function combineItems($el1IN,$level1IN,$el2IN,$level2IN){

    // global $test, $el1, $el2, $level1, $level2, $el1Result, $el2Result, $el1Amount, $el2Amount, $el1Energies, $el2Energies,$sumEnergies,$level,$ratio,$newItem,$newItemAmount;
    // $el1=$el1IN;
    // $el2=$el2IN;
    // $level1=$level1IN;
    // $level2=$level2IN;

    // include "../items/combineItems.php";
  
    // getAmounts();
    // enoughItems();
    // subtractQuantities();
    // getEnergyValues();
    // newEnergyValues();
    // newRatio();
    // newItem();
    // $username= $_POST["username"];
    // echo("<script>log('$username')</script>");
    // echo("<script>log('holapablito')</script>");
}

function example() {
    echo "this is a test";
}

function argsExample($arg1, $arg2) {
    echo $arg1 . " " . $arg2;
}

?>