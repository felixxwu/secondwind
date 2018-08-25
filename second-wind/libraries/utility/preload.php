<?php

// this will dump all images from the root directory (recursively) into a hidden div forcing the browser to load these images

getDirContents(getcwd());

function getDirContents($dir){
    $files = scandir($dir);

    foreach($files as $key => $value){
        $path = realpath($dir.DIRECTORY_SEPARATOR.$value);
        if(!is_dir($path)) {
            $path = substr($path, strlen(getcwd()) + 1);
            if(preg_match("/\.(jpg|jpeg|png|svg)$/i", $path)){
                echo "<img src='" . hashify($path) . "' />";
            }
        } else if($value != "." && $value != "..") {
            getDirContents($path);
        }
    }
}

?>