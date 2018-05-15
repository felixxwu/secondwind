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

function combineItems($el1,$level1,$el2,$level2){

    include "combineItems.php";
    testItems();
    //getAmounts();
    // echo("<script>console.log('$el1Result');</script>");
    
    // enoughItems();
    // subtractQuantities();
    // getEnergyValues();
    // newEnergyValues();
    // newRatio();
    // newItem();
}

function example() {
    echo "this is a test";
}

function argsExample($arg1, $arg2) {
    echo $arg1 . " " . $arg2;
}

?>