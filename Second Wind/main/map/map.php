
<link rel="stylesheet" href="<? hashify('main/map/map.css'); ?>"/>
<div id="mapGrid">
  <div id="mapSquare">
    <div class="mapSquare" id="xysensitive" onclick="addMarker(event)"></div>
    <div class="invert mapSquare" id="myLocation"></div>
    <div class="invert mapSquare" id="markers"></div>
    <div id="line"></div>
    <div id="perimeter"></div>
  </div>
  <div id="mapUI">
    <select id="selectIslands"></select>
    <div class="button" id="movehere" onclick="move()" style="display:none;">move here</div><br/>
    <div class="button" onclick="hideMap()">close map</div>
  </div>
</div>