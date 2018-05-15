<?
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
<div class="grid-container">
  <div class="item1"></div>
  <div class="userLevel"></div>
  <div class="item2">
    <div> notifications </div>
    <div class="notification_box"></div>
  </div>
  <div class="item3">
    <div id="pablotests"></div>
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
    <table>
      <tr>
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
          <input id="intelligence" oninput="doneAllocation()" type="number" value="0"/>
        </td>
        <td>
          <input id="building" oninput="doneAllocation()" type="number" value="0"/>
        </td>
      </tr>
    </table>
    <button id="submit" onclick="submitEnergyAllocation()" style="display: none;">DONE</button>
    <div id="confirmMessage"></div>
    <itemList id="itemList"></itemList>
    <div id="testItems"></div>
    <button id="combine" onclick="combineItems()">Combine items</button>
    <div id="errorItems"></div>
  </div>
  <div class="item4">
    <div>analytics</div>
    <div class="notification_box"></div>
  </div>
  <div class="item5"><a onclick="logout()">logout</a></div>
  <update>
    <script>updateItemsList();</script>
  </update>
</div>