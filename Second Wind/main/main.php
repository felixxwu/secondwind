<?
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
	echo("
		<script> var energyAllocations = ".json_encode($resourceAlloc, JSON_PRETTY_PRINT).";
		//creates a button for each item so when they are clicked the item is added to the combining queue
		//document.getElementById('human').innerHTML = energyAllocations.human;
		log(energyAllocations);
		</script>");
	var_dump($resourceAlloc);
}
?>
<link rel="stylesheet" href="main/mainStyle.css"/>
<div class="grid-container">
  <div class="item1"></div>
  <div class="userLevel"></div>
  <div class="item2">
    <div> notifications </div>
    <div class="notification_box"></div>
  </div>
  <div class="item3"> <?php getEnergyAllocation() ?>
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
    <div id="ghost"></div>
  </div>
</div>