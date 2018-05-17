
<link rel="stylesheet" href="main/map/map.css?v=<?=time()?>"/>
<div id="hideMap" onclick="secureLoad('ghosty','libraries/ajax/secureVariables.php',{'variableMultipleArgsExample': ['hello','world']})" style="position: fixed; color: white; z-index: 15;">HIDE MAP</div>
<div id="map" style="display:none;"><span>
    <div class="absolute" id="markers"></div>
    <div id="xysensitive" onclick="clickme()"></div></span></div>