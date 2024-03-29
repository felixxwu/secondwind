
<link rel="stylesheet" href="<?= hashify('main/map/map.css'); ?>"/>
<link rel="stylesheet" href="<?= hashify('main/map/zoom.css'); ?>"/>
<div id="mapGrid">
  <div id="bgContainer">
    <background></background>
  </div>
  <div id="mapSquare">
    <div class="mapSquare" id="xysensitive" onclick="mapClick(event)"></div>
    <div class="mapSquare" id="perimeter"></div>
    <div id="line"></div>
    <div class="mapSquare" id="playerLocations"></div>
    <div class="mapSquare" id="sourceLocations"></div>
    <div class="invert mapSquare" id="myLocation"></div>
    <div class="invert mapSquare" id="markers"></div>
    <div class="mapSquare" id="quickActions">
      <div id="quickActionContainer">
        <div id="quickActionCard"></div>
      </div>
    </div>
    <div class="mapSquare" id="zoomButtons"></div>
    <div id="gridLines"></div><a id="zoomOutButton" onclick="zoomOut()" style="display:none"><img class="invert" src="material-icons/zoomOut.svg"/></a>
  </div>
  <div id="mapUI">
    <button onclick="removeSources()">Remove sources</button>
    <div id="selectedPlayers"></div>
    <div id="selectedSources"></div><br/>
    <select id="selectIslands"></select>
    <div class="button iconButton" onclick="hideMap()">CLOSE MAP<img class="invert" src="material-icons/close.svg"/></div>
  </div>
</div>