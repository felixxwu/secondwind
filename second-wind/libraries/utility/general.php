<?php

function jsLog($log) {
    echo "<script>console.log('" . json_encode($log) . "');</script>";
}

function jsWarn($log) {
    echo "<script>console.warn('" . json_encode($log) . "');</script>";
}

function echoAsVar($name, $var) {
    echo "<script>var $name = " . json_encode($var) . ";</script>";
}

function checkExists($file) {
    if (!file_exists($file)) {
        jsWarn($file . " does not exist. CWD: " . getcwd());
    }
}

function hashify($file) {
    checkExists($file);
    echo "$file?h=" . hash_file("crc32", $file);
}

?>