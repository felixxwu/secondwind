<?
function getEnergy(){
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
}
?>
<script src="/js_functions/energy.js"></script>
<script src="/js_functions/items.js"></script>
<html>
  <head>
    <body></body>
    <div class="grid-container">
      <div class="item1"></div>
      <div class="userLevel"></div>
      <div class="item2"></div>
      <div> notifications </div>
      <div class="notification_box"></div>
      <div class="item3"></div>
      <table>
        <div id="energies"></div>
        <tr></tr>
        <td>
          <input id="human" oninput="doneAllocation()" type="number" value="&lt;?e($humanAlloc)?&gt;"/>
        </td>
        <td>
          <input id="attack" oninput="doneAllocation()" type="number" value="&lt;?e($attackAlloc)?&gt;"/>
        </td>
        <td>
          <input id="power" oninput="doneAllocation()" type="number" value="&lt;?e($powerAlloc)?&gt;"/>
        </td>
        <td>
          <input id="intel" oninput="doneAllocation()" type="number" value="&lt;?e($intelAlloc)?&gt;"/>
        </td>
        <td>
          <input id="build" oninput="doneAllocation()" type="number" value="&lt;?e($buildAlloc)?&gt;"/>
        </td>
      </table>
      <button id="submit" onclick="submitAllocation()" style="display: none;">DONE</button>
      <div id="confirmMessage"></div>
      <div id="itemList"></div>
      <items id="items"></items>
      <div id="testItems"></div>
      <button id="combine" onclick="combineItems()">Combine items</button>
      <div id="errorItems"></div>
      <div class="item4"></div>
      <div>analytics</div>
      <div class="notification_box"></div>
      <div class="item5"></div><a onclick="logout()">logout</a>
      <div id="ghost"></div>
    </div>
  </head>
</html>