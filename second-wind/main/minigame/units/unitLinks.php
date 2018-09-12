<?php

// takes all json files in the directory /json and adds them to a unitsManual js object

$directory = "main/minigame/units/json";
$dirFiles = scandir($directory);
var_dump($dirFiles);

?>

<script>

    // php pastes everything into json
    var unitBlueprints = {
        <? foreach ($dirFiles as $filename) {
            if (substr($filename, -5) == ".json") {
                echo substr($filename, 0, -5) . ": " . file_get_contents($directory . "/" . $filename) . ",";
            }
        } ?>
    };
</script>