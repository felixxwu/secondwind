<?php

if (isset($_POST["func"])) {
    $func = $_POST["func"];
    if (function_exists($func)) {
        $func();
    } else {
        echo "<script>console.log('function " . $func . "() does not exist');</script>";
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