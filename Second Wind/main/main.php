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
<link rel="stylesheet" href="main/island.css?v=<?=time()?>"/>
<link rel="stylesheet" href="main/mainLayout.css?v=<?=time()?>"/>
<link rel="stylesheet" href="main/notificationLayout.css?v=<?=time()?>"/>
<link rel="stylesheet" href="main/analyticsLayout.css?v=<?=time()?>"/>
<div class="mainLayout">
  <div class="headleft"><span class="helper"></span><a onclick="show('notifications','slideInLeft',0.5)"><img class="icon" src="material-icons/notifications.svg"/></a><a onclick="show('analytics','slideInRight',0.5)"><img class="icon" src="material-icons/chart.svg"/></a></div>
  <div class="pic"><img src="images/level.png" alt=""/></div>
  <div class="mid">
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
<<<<<<< HEAD
    <div id="island"><img id="islandrock" src="images/rock.svg"/>
      <div class="townhall"><img src="images/townHall_animation.svg"/><a onclick="show('energies','fadeInUp', 1)"> </a></div>
=======
    <div class="animated fadeInUp" id="island"><img id="islandrock" src="images/rock.svg"/>
      <div class="townhall"><img src="images/townHall.svg"/><a onclick="show('energies','fadeInUp', 1)"></a></div>
>>>>>>> ba318d52508ec965ea2e62949b3246ced48826e2
    </div>
  </div>
  <div class="foot"><a onclick="logout()">logout</a></div>
</div>
<div class="notificationLayout" id="notifications">
  <div class="notifications"><a class="button" onclick="hide('notifications', 'slideOutLeft', 0.5)">hide</a></div>
</div>
<div class="analyticsLayout" id="analytics">
  <div class="analytics"><a class="button" onclick="hide('analytics', 'slideOutRight', 0.5)">hide</a></div>
</div>
<update>
  <script>getEnergyAllocation();</script>
  <script>updateItemsList();</script>
  <script>setupSliders();</script>
</update>