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
    return "$file?h=" . hash_file("crc32", $file);
}

function strSame($str1, $str2) {
    if (strtolower($str1) == strtolower($str2)) {
        return true;
    } else {
        return false;
    }
}

?>