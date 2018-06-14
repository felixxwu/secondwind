<?php

// include "../database/databaseFunctions.php";

include "libraries/items/combineItems.php";
// here are all the "definitions" for the variables, which can be accessed from ajax.loadVariable
// in any of these definition functions below, simply return the value that you want to be echo'ed into javascript
// this can then be used in the js callback function, or other places for use

$vars = $_POST;
unset($vars["username"]);

echo "<script>\n";

// get the key (variables names) and values (arguments) from each POST element
foreach ($vars as $var => $args) {

    // show error if a function does not exist
    if (function_exists($var)) {

        // start to echo out js variable declarations
        echo "var " . $var . " = ";

        // apply the arguments as an array if it is an array
        // apply arguments to the functions as normal if not
        if (is_array($args)) {
            echo json_encode(call_user_func_array($var, $args));
        } else {
            echo json_encode(call_user_func($var, $args));
        }
        echo ";\n";
    } else {
        echo "<script>console.error('variable function " . $var . "() does not exist in variables.php');</script>";
    }
}
unset($vars);
echo "</script>";

// add variables here...

function fetchPositions() {
    return sqlSelect("locations", "*", "true", "username");
}

function energyAllocation(){
    $username=$_POST["username"];
	return $resourceAlloc;
}

//returns a json of all existing items with their ratios
function getRatiosList(){
    $username=$_POST["username"];
    $ratios = sqlSelectWithoutCriteria("items","*","name");    
	return $ratios;
}
//returns a list of all the existing combinations
function getCombinationsList(){
    $username=$_POST["username"];
    $combinations = sqlSelect("itemCombinations","*","`user` = '$username'","`finish_time`");

	return $combinations;
}
//returns list of items and their ratios - doesn't return shits
function getItemList(){
    $username=$_POST["username"];
    $itemList = sqlSelect("usersItems, items","item,level,amount,human,intelligence,attack,building,power","usersItems.username='$username' AND usersItems.item = items.name AND amount > 0","usersItems.amount");
    return $itemList;
}

//returns list of shits
function getShitList(){
    $username=$_POST["username"];
    $shitList = sqlSelect('usersItems','item,amount,level',"username='$username' AND amount>0 AND item like 'shit@%'",'item');
    return $shitList;
}
function itemList(){
    $username=$_POST["username"];
    $result = sqlSelect('usersItems','item,amount,Level',"username='$username' AND amount>0",'item');
    
    return $result;
}

function energies(){
    $username=$_POST["username"];
    $rows = 'human, attack, power, intelligence, building';
    $query = sqlSelect('energy',$rows,"username='$username'","`username`")[0];
 
    return $query;

}

//returns the rows corresponding to finished combinations and creates the corresponding items
function ajaxGetFinishedCombinations(){
    $username=$_POST["username"];
    $time=time();
    $result= sqlSelect('itemCombinations','*',"finish_time<=$time",'finish_time');

    //delete entries from database that correspond to finished combinations and creates the resulting items
    foreach ($result as $finished) {

        //delete entries
        $id = $finished['id'];
        $criteria = "`user` = '$username' AND `id` = '$id'";
        sqlDelete("itemCombinations", $criteria);

        //create new items and update item database
        global $username, $test, $el1, $el2, $level1, $level2, $el1Result, $el2Result, $el1Amount, $el2Amount, $el1Energies, $el2Energies,$sumEnergies,$level,$ratio,$newItem,$newItemAmount;
        $el1=$finished['item1'];
        $el2=$finished['item2'];
        $level1=$finished['level_item1'];
        $level2=$finished['level_item2'];
        $username=$_POST["username"];
        getEnergyValues();
        newEnergyValues();
        newRatio();
        newItem();
        
    }
    return $result;
}

//returns the rows corresponding to ongoing combinations
function ajaxGetOngoingCombinations(){
    $username=$_POST["username"];
    $time=time();
    $result= sqlSelect('itemCombinations','*',"finish_time>$time",'finish_time');
    return $result;
}

function ajaxGetCombiningTimes($id){
    $username=$_POST["username"];
    $times = sqlSelect("itemCombinations", "`start_time`,`finish_time`", "`id` = '$id'",'id');
    return $times; //returns json consisting of starting time and finishing time of a given combination
}
function variableExample() {
    return 5;
}

function arrayExample() {
    return array(1, 2, 3, 4, array("hello", "world"));
}

function variableWithArgExample($arg) {
    return $arg;
}

function variableMultipleArgsExample($arg1, $arg2) {
    return array($arg1, $arg2, $_POST["username"]);
}

// for checking if a user exists on the signup page
function message($username) {
    if (!$username) {
        return "";
    }

    // checks if the username already exists
    if (sqlSelect("users","*","`username` = '" . $username . "'","`username`")) {
        // user exists
        return "<red>username already taken</red>";
    } else {
        // user doesnt
        return "<green>username is available</green>";
    }
}

// AJAX LOP FUNCTIONS ###################################################################################

function myIslands() {
    $islands = sqlSelect("locations", "`island`,`x`,`y`", "`username` = '" . $_POST["username"] . "'", "id");
    return $islands;
}

function otherIslands() {
    $islands = sqlSelect("locations", "`username`,`island`,`x`,`y`", "NOT `username` = '" . $_POST["username"] . "'", "id");
    return $islands;
}

function myTargets() {
    $targets = sqlSelect("targetLocations", "*", "`username` = '" . $_POST["username"] . "'", "id");
    return $targets;
}

function ajaxSources(){
    return sqlSelectWithoutCriteria("sources", "*","id"); 
}

?>