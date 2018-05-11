<?php

if (isset($_POST["func"])) {

    // get the function name to be called
    $func = $_POST["func"];

    // show error if the function does not exist
    if (function_exists($func)) {
        $func();    // call the function
    } else {
        echo "<script>console.error('call function " . $func . "() does not exist in call.php');</script>";
    }
}

// functions go here...

function test() {
    echo "this is a test";
}

function testArgs() {
    echo "post var: " . $_POST["test"];
    echo $_POST["arg1"];
    echo "<br>";
    echo $_POST["arg2"];
}

?>