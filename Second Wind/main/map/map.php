
<link rel="stylesheet" href="main/map/map.css?v=<?=time()?>"/>
<div id="hideMap" onclick="hide('map','fadeOut',1);forward('hidden',function(){show('map','fadeIn',1);})" style="position: fixed; color: white; z-index: 15;">HIDE MAP</div>
<div id="map" style="display:none;"><span>
    <div class="absolute" id="xysensitive" onclick="clickme()"></div>
    <div id="markers"></div></span></div>