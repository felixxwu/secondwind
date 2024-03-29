
<link rel="stylesheet" href="<?= hashify('main/minigame/minigame.css'); ?>"/>
<link rel="stylesheet" href="<?= hashify('main/minigame/units.css'); ?>"/><?php

// takes all json files in the directory /json and adds them to a unitsManual js object

$directory = "main/minigame/units/json";
$dirFiles = scandir($directory);
var_dump($dirFiles);

?>

<script>
    var unitsManual = {
        <? foreach ($dirFiles as $filename) {
            if (substr($filename, -5) == ".json") {
                echo substr($filename, 0, -5) . ": " . file_get_contents($directory . "/" . $filename) . ",";
            }
        } ?>
    };
</script>
<overlay id="chooseUnitOverlay" style="display:none">
  <div id="chooseUnitMenu">
    <h3>CHOOSE A UNIT</h3>
    <div id="unitList"></div><br/><a class="button iconButton" onclick="hide('chooseUnitOverlay','fadeOut',1)">close<img class="invert" src="material-icons/close.svg"/></a>
  </div>
</overlay>
<div id="minigame" style="display:none">
  <header>
    <div id="minigameHeader"></div>
    <div id="minigameTurn"></div>
    <div>test</div>
  </header>
  <div id="board"><img id="boardImg" src="images/board_mountain.svg"/>
    <overlay id="unitSprites"></overlay>
    <overlay id="plusSigns"></overlay>
  </div>
  <div id="sideMenu"></div>
  <footer id="footerBackgroundWorkaround">
    <div id="minigameTurnCounter"></div><a class="button" onclick="endTurn()">end turn</a><a class="button iconButton" onclick="closeMinigame()">close<img class="invert" src="material-icons/close.svg"/></a>
  </footer>
</div>
<script>initBoardButtons(4, 7);</script>