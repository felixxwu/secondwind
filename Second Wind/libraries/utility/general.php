<?php

function jsLog($log) {
    echo "<script>console.log('$log');</script>";
}

function jsWarn($log) {
    echo "<script>console.warn('$log');</script>";
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