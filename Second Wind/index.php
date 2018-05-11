
<html>
  <head>
    <title>Second Wind</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="libraries/ajax/AjaxHelper.js"></script>
  </head>
  <body>hello<br/><a onclick="getFive()">click me</a><br/><?
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
	echo($resourceAlloc);
}
?>
    <link rel="stylesheet" href="main/mainStyle.css"/>
    <script src="js_functions/energy.js"></script>
    <script src="js_functions/items.js"></script>
    <div class="grid-container">
      <div class="item1"></div>
      <div class="userLevel"></div>
      <div class="item2">
        <div> notifications </div>
        <div class="notification_box"></div>
      </div>
      <div class="item3">
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
      </div>
      <div class="item4">
        <div>analytics</div>
        <div class="notification_box"></div>
      </div>
      <div class="item5"><a onclick="logout()">logout</a>
        <div id="ghost"></div>
      </div>
    </div>
    <script>
      function getFive() {
          var ajax = new AjaxHelper("libraries/ajax");
          ajax.loadVariables("output", {"variableExample": null, "variableWithArgExample": "heyo", "variableMultipleArgsExample": ["foo", "bar"]}, function() {
              console.log(variableExample);
              console.log(variableWithArgExample);
              console.log(variableMultipleArgsExample);
          })
      
          ajax.call("argsExample",{0: "hey", 1: "there"}, function() {
              console.log("call done");
          });
          
      }
    </script>
  </body>
</html>