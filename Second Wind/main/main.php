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
<link rel="stylesheet" href="main/island.css"/>
<div class="grid-container">
  <div class="item1"></div>
  <div class="userLevel"></div>
  <div class="item2">
    <div> notifications </div>
    <div class="notification_box"></div>
  </div>
  <div class="item3">
    <div class="container absolute">
      <div class="hidden" id="energies">
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
    <div id="island"><img id="islandrock" src="images/rock.svg"/>
      <div class="townhall"><img src="images/townHall.svg"/><a onclick="show('energies','fadeInUp', 1)"> </a></div>
    </div>
  </div>
  <div class="item4">
    <div>analytics</div>
    <div class="notification_box"></div>
  </div>
  <div class="item5"><a onclick="logout()">logout</a></div>
  <update>
    <script>getEnergyAllocation();</script>
    <script>updateItemsList();</script>
    <script>setupSliders();</script>
  </update>
</div>