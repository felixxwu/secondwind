<?
//retrieves energy allocation values from database
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
<link rel="stylesheet" href="main/mainStyle.css"/>
<script src="main/js_functions/energy.js"></script>
<script src="main/js_functions/items.js"></script>
<div class="grid-container">
  <div class="item1"></div>
  <div class="userLevel"></div>
  <div class="item2">
    <div> notifications </div>
    <div class="notification_box"></div>
  </div>
  <div class="item3">
    <div id="energytest"></div>
    <table>
      <div id="energies"></div>
      <tr></tr>
      <td>
        <input id="human" oninput="doneAllocation()" type="number" value="0"/>
      </td>
      <td>
        <input id="attack" oninput="doneAllocation()" type="number" value="0"/>
      </td>
      <td>
        <input id="power" oninput="doneAllocation()" type="number" value="0"/>
      </td>
      <td>
        <input id="intel" oninput="doneAllocation()" type="number" value="0"/>
      </td>
      <td>
        <input id="build" oninput="doneAllocation()" type="number" value="0"/>
      </td>
    </table>
    <button id="submit" onclick="submitAllocation()" style="display: none;">DONE</button>
    <div id="confirmMessage"></div>
    <div id="itemList"></div>
    <items id="items"></items>
    <div id="testItems"></div>
    <button id="combine" onclick="combineItems()">Combine items</button>
    <div id="errorItems"></div>
  </div>
  <div class="item4">
    <div>analytics</div>
    <div class="notification_box"></div>
  </div>
  <div class="item5"><a onclick="logout()">logout</a>
    <div id="ghost">
       <?php getEnergyAllocation() ?></div>
  </div>
</div>