
<link rel="stylesheet" href="main/map/map.css?v=<?=time()?>"/>
<div id="mapVars"><?php

$islands = sqlSelect("locations", "`island`,`x`,`y`", "`username` = '" . $_POST["username"] . "'", "island");
echoAsVar("islands", $islands);
echo "<script>
mapVarInit();
</script>";

?>
</div>
<div id="mapGrid">
  <div id="mapSquare">
    <div id="xysensitive" onclick="addMarker()"></div>
    <div id="myLocation"></div>
    <div id="markers"></div>
  </div>
  <div id="mapUI">
    <select id="selectIslands"></select><br/>
    <div class="button" onclick="hideMap()">close map</div>
  </div>
</div>