<?php

echo "<script>";
foreach ($_POST as $var => $args) {
    if (function_exists($var)) {
        echo "var " . $var . " = ";
        if (is_array($args)) {
            echo json_encode(call_user_func_array($var, $args));
        } else {
            echo json_encode(call_user_func($var, $args));
        }
        echo ";";
    } else {
        echo "<script>console.error('variable function " . $var . "() does not exist in variables.php');</script>";
    }
}
echo "</script>";

// add variables here...

function variableExample() {
    return 5;
}

function arrayExample() {
    return array(1, 2, 3, 4, array("hello", "shitboy"));
}

function variableWithArgExample($arg) {
    return $arg;
}

function variableMultipleArgsExample($arg1, $arg2) {
    return array($arg1, $arg2);
}

?>