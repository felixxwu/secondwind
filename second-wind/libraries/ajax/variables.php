<?php

include "../database/databaseFunctions.php";

// here are all the "definitions" for the variables, which can be accessed from ajax.loadVariable
// in any of these definition functions below, simply return the value that you want to be echo'ed into javascript
// this can then be used in the js callback function, or other places for use

echo "<script>\n";

// get the key (variables names) and values (arguments) from each POST element
foreach ($_POST as $var => $args) {

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
echo "</script>";

$conn->close();

// add variables here...


function energyAllocation(){
    $resourceAlloc = sqlSelect("resourceAllocation","*","`username` = 'test'","`username`")[0];
	return $resourceAlloc;
}
function itemList(){
    $result = sqlSelect('usersItems','item,amount,Level',"username='test'",'item');
    
    return $result;
}

// function energies(){
//     $rows = 'human, attack, power, intelligence, building';
//     $query = sqlSelect('energy',$rows,"username='test'","`username`")[0];
 
//     return $query;

// }

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
    return array($arg1, $arg2);
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







function myIslands($username) {
    $islands = sqlSelect("locations", "`island`,`x`,`y`", "`username` = '" . $username . "'", "id");
    return $islands;
}

function otherIslands($username) {
    $islands = sqlSelect("locations", "`username`,`island`,`x`,`y`", "NOT `username` = '" . $username . "'", "id");
    return $islands;
}

function myTargets($username) {
    $targets = sqlSelect("targetLocations", "*", "`username` = '" . $username . "'", "id");
    return $targets;
}

function ajaxSources($username){
    return sqlSelectWithoutCriteria("sources", "*","id"); 
}

function myBattles($username) {
    $myBattles = sqlSelect("battles", "*", "`attacker` = '$username' OR `defender` = '$username'", "id");
    return $myBattles;
}

function energies($username){
    $rows = 'human, attack, power, intelligence, building';
    $query = sqlSelect('energy',$rows,"username='$username'","`username`")[0];
 
    return $query;

}

?>