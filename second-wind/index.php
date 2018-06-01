
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/><link href="https://fonts.googleapis.com/css?family=Quicksand:300" rel="stylesheet">
    <style><?= file_get_contents("css/loading.css"); ?></style>
  </head>
  <body>
    <div id="ghost"> </div>
    <div id="loading">
      <text>loading...</text>
    </div><a class="absolute" href="login" style="z-index: -1;">if nothing happens, click here to login again</a>
    <div id="main"></div>
    <div id="errorContainer" style="display:none">
      <div id="error">this is an error message</div>
    </div>
    <div id="links">
      <script>
        <?= file_get_contents("libraries/utility/link.js"); ?>
        
        linkCss("<? hashify('css/style.css'); ?>");
        linkCss("css/animate.css");
        linkCss("<? hashify('css/mainStyle.css'); ?>");
        linkCss("<? hashify('css/buttons.css'); ?>");
        
        linkJs("https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js");
        linkJs("https://code.jquery.com/jquery-3.2.1.min.js");
        
        linkJs("<? hashify('libraries/ajax/newAjaxHelper.js'); ?>");
        linkJs("<? hashify('libraries/ajax/ajaxLoop.js'); ?>");
        
        linkJs("<? hashify('libraries/account/functions.js'); ?>");
        linkJs("<? hashify('libraries/account/secureLoad.js'); ?>");
        
        linkJs("<? hashify('libraries/utility/general.js'); ?>");
        linkJs("<? hashify('libraries/utility/animation.js'); ?>");
        linkJs("<? hashify('libraries/utility/hashNavigation.js'); ?>");
        
        linkJs("<? hashify('libraries/energy/energy.js'); ?>");
        linkJs("<? hashify('libraries/items/items.js'); ?>");
        linkJs("<? hashify('libraries/slider/sliderdemo.js'); ?>") ;
        
        linkJs("<? hashify('main/menu/menu.js'); ?>");
        linkJs("<? hashify('main/notifications/notifications.js'); ?>");
        
        linkJs("<? hashify('main/map/map.js'); ?>");
        linkJs("<? hashify('main/map/init.js'); ?>");
        linkJs("<? hashify('main/map/draw.js'); ?>");
        linkJs("<? hashify('main/map/players.js'); ?>");
        linkJs("<? hashify('main/map/perimeter.js'); ?>");
        linkJs("<? hashify('main/map/quickActions.js'); ?>");
        linkJs("<? hashify('main/map/zoom.js'); ?>");
        
        linkJs("<? hashify('main/minigame/minigame.js'); ?>");
        
        linkJs("<? hashify('init.js'); ?>");
      </script>
    </div>
  </body>
</html>