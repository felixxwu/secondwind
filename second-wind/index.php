
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

?><!DOCTYPE html>
<html>
  <head>
    <title>Second Wind</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="<? hashify('css/style.css'); ?>"/>
  </head>
  <body>
    <div id="ghost"> </div>
    <div id="loading">
      <text>loading...</text>
    </div>
    <link rel="stylesheet" href="css/animate.css"/>
    <link rel="stylesheet" href="<? hashify('css/mainStyle.css'); ?>"/>
    <link rel="stylesheet" href="<? hashify('css/buttons.css'); ?>"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="<? hashify('libraries/ajax/newAjaxHelper.js'); ?>"></script>
    <script src="<? hashify('libraries/account/functions.js'); ?>"></script>
    <script src="<? hashify('libraries/account/secureLoad.js'); ?>"></script>
    <script src="<? hashify('libraries/utility/general.js'); ?>"></script>
    <script src="<? hashify('libraries/utility/animation.js'); ?>"></script>
    <script src="<? hashify('libraries/utility/hashNavigation.js'); ?>"></script>
    <script src="<? hashify('libraries/energy/energy.js'); ?>"></script>
    <script src="<? hashify('libraries/items/items.js'); ?>"></script>
    <script src="<? hashify('libraries/slider/sliderdemo.js'); ?>"> </script>
    <script src="<? hashify('main/menu/menu.js'); ?>"></script>
    <script src="<? hashify('main/notifications/notifications.js'); ?>"></script>
    <script src="<? hashify('main/map/map.js'); ?>"></script>
    <script src="<? hashify('main/map/init.js'); ?>"></script>
    <script src="<? hashify('main/map/perimeter.js'); ?>"></script>
    <script src="<? hashify('main/ajaxLoop.js'); ?>"></script>
    <script src="<? hashify('init.js'); ?>"></script><a class="absolute" href="login" style="z-index: -1;">if nothing happens, click here</a>
    <div id="main"></div>
  </body>
</html>