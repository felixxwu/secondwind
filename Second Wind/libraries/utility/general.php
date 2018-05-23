<?php

function jsLog($log) {
    echo "<script>console.log($log);</script>";
}

function echoAsVar($name, $var) {
    echo "<script>var $name = " . json_encode($var) . ";</script>";
}

?>