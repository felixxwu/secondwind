<?php
include "../database/databaseFunctions.php";
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
include "../../main/php_functions/combineItems.php";
function combineItems(){
    //USE THE FUNCTIONS FROM COMBINE ITEMS TO COMBINE THE ITEMS
}

function example() {
    echo "this is a test";
}

function argsExample($arg1, $arg2) {
    echo $arg1 . " " . $arg2;
}

?>