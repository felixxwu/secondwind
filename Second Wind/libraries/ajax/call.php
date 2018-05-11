<?php

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

function example() {
    echo "this is a test";
}

function argsExamples($arg1, $arg2) {
    echo $arg1 . " " . $arg2;
}

?>