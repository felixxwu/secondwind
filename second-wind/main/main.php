<?

//THIS FILE CAN BE DELETED##############




//update energy input boxes with their respective allocations
function getEnergyAllocation(){
	$resourceAlloc = sqlSelect("resourceAllocation","*","`username` = 'your_mum_is_a_cat'","`username`")[0];
	if (!$resourceAlloc) {
		$humanAlloc = "0";
		$powerAlloc = "0";
		$attackAlloc = "0";
		$intelAlloc = "0";
		$buildAlloc = "0";
	} else {
		$humanAlloc = $resourceAlloc["human"];
		$powerAlloc = $resourceAlloc["power"];
		$attackAlloc = $resourceAlloc["attack"];
		$intelAlloc = $resourceAlloc["intelligence"];
		$buildAlloc = $resourceAlloc["building"];
	}

//initializes the energy allocation values in the input boxes
	echo("
		<script> var energyAllocations = ".json_encode($resourceAlloc, JSON_PRETTY_PRINT).";
		document.getElementById('human').value = energyAllocations.human;
		document.getElementById('power').value = energyAllocations.power;
		document.getElementById('attack').value = energyAllocations.attack;
		document.getElementById('intelligence').value = energyAllocations.intelligence;
		document.getElementById('building').value = energyAllocations.building;
		</script>");
}
?>
<link rel="stylesheet" href="<? hashify('main/css/mainLayout.css'); ?>"/>
<link rel="stylesheet" href="<? hashify('main/notifications/notifications.css'); ?>"/>
<link rel="stylesheet" href="<? hashify('main/css/analyticsLayout.css'); ?>"/>
<link rel="stylesheet" href="<? hashify('main/island/buildings/factory.css'); ?>"/>
<div class="mainLayout">
  <div class="headleft"><span class="helper"></span><a class="mobileOnly" onclick="toggleMenu()"><img class="icon absolute" id="menuicon" src="material-icons/menu.svg"/><img class="icon absolute" id="closeicon" src="material-icons/close.svg" style="display:none"/></a></div>
  <div class="pic"><img src="images/level.png" alt=""/></div>
  <div class="headright"><span class="helper"></span><a class="desktopOnly" onclick="toggle('notifications', 'fadeInLeft', 'fadeOutLeft', 1, undefined, undefined, 'grid')"><img class="icon" src="material-icons/notifications.svg"/></a><a class="desktopOnly" onclick="toggle('analytics', 'fadeInRight', 'fadeOutRight', 1, undefined, undefined, 'grid')"><img class="icon" src="material-icons/chart.svg"/></a><a class="desktopOnly" onclick="showMap()"><img class="icon" src="material-icons/map.svg"/></a><a onclick="logout()"><img class="icon" src="material-icons/logout.svg"/></a></div>
  <div class="mid" id="floatUp" style="display:none">
    <link rel="stylesheet" href="<? hashify('main/island/island.css'); ?>"/>
    <div id="island"><img id="islandrock" src="<? hashify('images/rock.svg'); ?>"/>
      <div class="townhall"><img src="<? hashify('images/townHall.svg'); ?>"/><a onclick="show('energies','fadeInUp', 1)"></a></div>
      <div class="factory"><img src="<? hashify('images/factory.svg'); ?>"/><a onclick="show('factory_menu','fadeInUp', 2);hide('analytics','fadeOutRight', 2);hide('notifications','fadeOutLeft', 2);"></a></div>
      <div class="extractor"> <img src="<? hashify('images/extractor_3_animation.svg'); ?>"/><a onclick="show('extractor_menu','fadeInUp', 2);hide('analytics','fadeOutRight', 2);hide('notifications','fadeOutLeft', 2);"></a></div>
    </div>
  </div>
  <script>show('floatUp','fadeInUp',10);</script>
  <div class="foot textWhite">footer</div>
</div>
<div id="foreground"><img class="foreground_left" id="foreground_left" src="<? hashify('images/foreground_left.svg'); ?>" style="display:none"/><img class="foreground_right" id="foreground_right" src="<? hashify('images/foreground_right.svg'); ?>" style="display:none"/>
  <script>show("foreground_left","fadeInLeft",7);</script>
  <script>show("foreground_right","fadeInRight",7);</script>
</div>
<div class="building_menus">      
  <div class="absolute" id="energies" style="display:none">
    <div id="pablotests"></div>
    <h3>Energy Values</h3>
    <div id="energytest">
      <table>
        <tr>
          <td id="humanEnergy"></td>
          <td id="attackEnergy"></td>
          <td id="powerEnergy"></td>
          <td id="intelligenceEnergy"></td>
          <td id="buildingEnergy"></td>
        </tr>
      </table>
    </div>
    <h3>Energy Allocation</h3>
    <p class="energyTitle">Human</p>
    <div class="slidecontainer">
      <input class="slider" id="human" type="range" min="-20" max="20" value="0"/>
    </div>
    <div class="demo" id="valueHuman"> </div>
    <p></p>
    <p class="energyTitle">Attack</p>
    <div class="slidecontainer">
      <input class="slider" id="attack" type="range" min="-20" max="20" value="0"/>
    </div>
    <div class="demo" id="valueAttack"> </div>
    <p></p>
    <p class="energyTitle">Power</p>
    <div class="slidecontainer">
      <input class="slider" id="power" type="range" min="-20" max="20" value="0"/>
    </div>
    <div class="demo" id="valuePower"> </div>
    <p></p>
    <p class="energyTitle">Intelligence </p>
    <div class="slidecontainer">
      <input class="slider" id="intelligence" type="range" min="-20" max="20" value="0"/>
    </div>
    <div class="demo" id="valueIntelligence"></div>
    <p></p>
    <p class="energyTitle">Building</p>
    <div class="slidecontainer">
      <input class="slider" id="building" type="range" min="-20" max="20" value="0"/>
    </div>
    <div class="demo" id="valueBuilding"></div>
    <button id="submit" onclick="submitEnergyAllocation()" style="display: none;">DONE</button>
    <div id="confirmMessage"></div>
  </div>
  <factory_menu id="factory_menu" style="display:none">
    <div id="factory_header"> 
      <text>Factory</text>
    </div>
    <div id="factory_items"> 
      <div id="item_header"> 
        <text>items</text>
      </div><br/>
      <table id="itemList">
        <tr>
          <th>Item</th>
          <th>Level</th>
          <th>Amount</th>
          <th>H</th>
          <th>A</th>
          <th>P</th>
          <th>I</th>
          <th>B</th>
        </tr>
      </table>
    </div>
    <div id="factory_actions"> 
      <action_title>actions</action_title>
      <button id="combine" onclick="newCombineItems()">Combine items</button>
      <div id="testItems"></div>
      <div id="errorItems"></div>
      <button id="hideMenu" onclick="hide('factory_menu','fadeOutDown', 1);show('analytics','fadeInRight', 2);show('notifications','fadeInLeft', 2)">Close Menu</button>
    </div>
    <div id="factory_descriptions">
      <canvas id="doughnut-chart"></canvas>
    </div>
    <div id="factory_progress"> 
      <div id="progress_bars"></div>
    </div>
  </factory_menu>
  <extractor_menu id="extractor_menu" style="display:none">
    <test>hey</test>
    <button id="hideMenu" onclick="hide('extractor_menus','fadeOutDown', 1);show('analytics','fadeInRight', 2);show('notifications','fadeInLeft', 2)">Close Menu</button>
  </extractor_menu>
</div>
<div class="notificationLayout" id="notifications" style="display:none">
  <div class="notifications">
    <div class="titleIcon"><img class="invert" src="material-icons/notifications.svg" width="35px"/></div>
    <div class="list">
      <div class="notificationCard"><br/><b>THIS IS THE TITLE</b><br/>
        <p>This is some text that will go into the card revealing some more information</p>
      </div>
      <div class="notificationCard"><br/><b>ANOTHER ONE</b><br/>
        <p>This is another notification</p><img class="invert" src="material-icons/map.svg"/><img class="invert" src="material-icons/close.svg"/>
      </div>
      <div class="notificationCard"><br/><b>ANOTHER ONE</b><br/>
        <p>This is another notification</p><img class="invert" src="material-icons/map.svg"/><img class="invert" src="material-icons/close.svg"/>
      </div>
      <div class="notificationCard"><br/><b>ANOTHER ONE</b><br/>
        <p>This is another notification</p><img class="invert" src="material-icons/map.svg"/><img class="invert" src="material-icons/close.svg"/>
      </div>
      <div class="notificationCard"><br/><b>ANOTHER ONE</b><br/>
        <p>This is another notification</p><img class="invert" src="material-icons/map.svg"/><img class="invert" src="material-icons/close.svg"/>
      </div>
      <div class="notificationCard"><br/><b>ANOTHER ONE</b><br/>
        <p>This is another notification</p><img class="invert" src="material-icons/map.svg"/><img class="invert" src="material-icons/close.svg"/>
      </div><a class="button mobileOnly" onclick="hide('notifications', 'slideOutLeft', 1)">hide</a>
    </div>
  </div>
  <script>show("notifications","fadeInLeft",10);</script>
</div>
<div class="analyticsLayout" id="analytics" style="display:none">
  <div class="analytics"><br/>
    <h1 class="textWhite">ANALYTICS</h1><a class="button mobileOnly" onclick="hide('analytics', 'slideOutRight', 1)">hide</a>
  </div>
  <script>show("analytics","fadeInRight",10);</script>
</div>
<div id="ajaxLoop"><?php

// BEFORE THE FIRST AJAX LOOP CALL THERE ARE NO VARIABLES
// THIS FILE PROVIDES NECESSARY VARIABLES FOR THE MAP BEFORE THE FIRST AJAX LOOP CALL 

$otherIslands = sqlSelect("locations", "`username`,`island`,`x`,`y`", "NOT `username` = '" . $_POST["username"] . "'", "id");
echoAsVar("otherIslands", $otherIslands);

$myIslands = sqlSelect("locations", "`island`,`x`,`y`", "`username` = '" . $_POST["username"] . "'", "island");
echoAsVar("myIslands", $myIslands);

$myTargets = sqlSelect("targetLocations", "*", "`username` = '" . $_POST["username"] . "'", "id");
echoAsVar("myTargets", $myTargets);

?>

</div>
<script>mapVarInit(); </script>
<link rel="stylesheet" href="<? hashify('main/map/map.css'); ?>"/>
<link rel="stylesheet" href="<? hashify('main/map/zoom.css'); ?>"/>
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
    <div id="selectedPlayers"></div>
    <div id="selectedSources"></div>
    <select id="selectIslands"></select>
    <div class="button iconButton" id="movehere" onclick="addTarget()" style="display:none;">MOVE TO MARKER<img class="invert" src="material-icons/move.svg"/></div><br/>
    <div class="button iconButton" id="zoomOut" onclick="zoomOut()" style="display:none">ZOOM OUT<img class="invert" src="material-icons/zoomOut.svg"/></div>
    <div class="button iconButton" onclick="hideMap()">CLOSE MAP<img class="invert" src="material-icons/close.svg"/></div>
  </div>
</div>
<link rel="stylesheet" href="<? hashify('main/menu/menu.css'); ?>"/>
<div id="menu" style="display:none"><a class="mobileOnly" onclick="show('notifications','slideInLeft',1,'grid');toggleMenu()"><img class="icon" src="<? hashify('material-icons/notifications.svg'); ?>"/></a><br/><a class="mobileOnly" onclick="show('analytics','slideInRight',1,'grid');toggleMenu()"><img class="icon" src="<? hashify('material-icons/chart.svg'); ?>"/></a><br/><a class="mobileOnly" onclick="showMap();toggleMenu()"><img class="icon" src="<? hashify('material-icons/map.svg'); ?>"/></a><br/></div>
<link rel="stylesheet" href="<? hashify('main/minigame/minigame.css'); ?>"/>
<div id="minigame" style="display:none">
  <header>
    <div id="minigameHeader"></div>
  </header>
  <div id="board"></div>
  <footer id="footerBackgroundWorkaround"></footer>
  <footer>
    <div id="minigameTurn"></div><a class="button" onclick="endTurn()">end turn</a><a class="button iconButton" onclick="closeMinigame()">close<img class="invert" src="material-icons/close.svg"/></a>
  </footer>
</div>
<script>initBoardButtons(4, 7);</script>
<script>ajaxLoop();</script>
<update>
  <script>updateFactory();</script>
  <script>setupSliders();</script>
</update>