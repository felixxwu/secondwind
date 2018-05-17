<?

//THIS FILE CAN BE DELETED##############




//update energy input boxes with their respective allocations
function getEnergyAllocation(){
	$resourceAlloc = sqlSelect("resourceAllocation","*","`username` = 'test'","`username`")[0];
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
<link rel="stylesheet" href="main/island/island.css?v=<?=time()?>"/>
<link rel="stylesheet" href="main/css/mainLayout.css?v=<?=time()?>"/>
<link rel="stylesheet" href="main/notifications/notificationLayout.css?v=<?=time()?>"/>
<link rel="stylesheet" href="main/css/analyticsLayout.css?v=<?=time()?>"/>
<div class="mainLayout">
  <div class="headleft"><span class="helper"></span><a class="mobileOnly" onclick="toggleMenu()"><img class="icon absolute" id="menuicon" src="material-icons/menu.svg"/><img class="icon absolute" id="closeicon" src="material-icons/close.svg" style="display:none"/></a></div>
  <div class="pic"><img src="images/level.png" alt=""/></div>
  <div class="headright"><span class="helper"></span><a class="desktopOnly" onclick="show('map','fadeIn',0.5)"><img class="icon" src="material-icons/map.svg"/></a><a onclick="logout()"><img class="icon" src="material-icons/logout.svg"/></a></div>
  <div class="mid" id="floatUp" style="display:none">
    <div id="island"><img id="islandrock" src="images/rock.svg"/>
      <div class="townhall"><img src="images/townHall.svg"/><a onclick="show('energies','fadeInUp', 1)"></a></div>
      <div class="extractor"> <a onclick="show('extractor','fadeInUp', 1)"></a></div>
    </div>
  </div>
  <script>show('floatUp','fadeInUp',3);</script>
  <div class="foot textWhite">footer</div>
</div>
<div id="foreground"><img class="foreground_left" src="images/foreground_left.svg"/><img class="foreground_right" src="images/foreground_right.svg"/></div>
<div class="building_menus">      
  <div id="extractor" style="display:none">hey there</div>
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
    <itemList id="itemList"></itemList>
    <div id="testItems"></div>
    <button id="combine" onclick="combineItems()">Combine items</button>
    <div id="errorItems"></div>
  </div>
</div>
<div class="notificationLayout" id="notifications">
  <div class="notifications">
    <div class="titleIcon"><img class="invert" src="material-icons/notifications.svg" width="35px"/></div>
    <div class="list">
      <div class="notificationCard"><br/><b>This is the title</b><br/>
        <p>This is some text that will go into the card revealing some more information</p>
      </div>
      <div class="notificationCard"><br/><b>Another one</b><br/>
        <p>This is another notification</p><img class="invert" src="material-icons/map.svg"/><img class="invert" src="material-icons/close.svg"/>
      </div>
      <div class="notificationCard"><br/><b>Another one</b><br/>
        <p>This is another notification</p><img class="invert" src="material-icons/map.svg"/><img class="invert" src="material-icons/close.svg"/>
      </div>
      <div class="notificationCard"><br/><b>Another one</b><br/>
        <p>This is another notification</p><img class="invert" src="material-icons/map.svg"/><img class="invert" src="material-icons/close.svg"/>
      </div>
      <div class="notificationCard"><br/><b>Another one</b><br/>
        <p>This is another notification</p><img class="invert" src="material-icons/map.svg"/><img class="invert" src="material-icons/close.svg"/>
      </div>
      <div class="notificationCard"><br/><b>Another one</b><br/>
        <p>This is another notification</p><img class="invert" src="material-icons/map.svg"/><img class="invert" src="material-icons/close.svg"/>
      </div><a class="button mobileOnly" onclick="hide('notifications', 'slideOutLeft', 0.5)">hide</a>
    </div>
  </div>
</div>
<div class="analyticsLayout" id="analytics">
  <div class="analytics"><br/>
    <h1 class="textWhite">analytics</h1><a class="button mobileOnly" onclick="hide('analytics', 'slideOutRight', 0.5)">hide</a>
  </div>
</div>
<link rel="stylesheet" href="main/map/map.css?v=<?=time()?>"/>
<div id="hideMap" onclick="hide('map','fadeOut',0.5)" style="position: fixed; color: white; z-index: 15;">HIDE MAP</div>
<div id="map" style="display:none;"><span>
    <div class="absolute" id="markers"></div>
    <div id="xysensitive" onclick="clickme()"></div></span></div>
<link rel="stylesheet" href="main/menu/menu.css?v=<?=time()?>"/>
<div id="menu" style="display:none"><a class="mobileOnly" onclick="show('notifications','slideInLeft',0.5)"><img class="icon" src="material-icons/notifications.svg"/></a><br/><a class="mobileOnly" onclick="show('analytics','slideInRight',0.5)"><img class="icon" src="material-icons/chart.svg"/></a><br/><a class="mobileOnly" onclick="show('map','fadeIn',0.5)"><img class="icon" src="material-icons/map.svg"/></a><br/></div>
<update>
  <script>getEnergyAllocation();</script>
  <script>updateItemsList();</script>
  <script>setupSliders();</script>
</update>