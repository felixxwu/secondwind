<?

function databaseConnect() {
	$servername = "localhost";
	$username = "noxiveco_swind";
	$password = "dQ/X92x^F4H;Si<@";
	$dbname = "noxiveco_second_wind";

	// Create connection
	global $conn;
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
}

function sqlSelect($table,$cols,$criteria,$orderby) {
	databaseConnect();
	global $conn;
	$sql = "SELECT $cols FROM $table WHERE $criteria ORDER BY $orderby";
	$result = $conn->query($sql);
	$rows = array();
	while ($row = $result->fetch_assoc()) {
			 $rows[] = $row;
	 }

	if (!$result) { // if result failed
		die("SQL SELECT Error: " . $sql . "<br>" . $conn->connect_error);
	}
	return $rows;
}

function sqlSelectSingle($table, $criteria, $col) {
	return sqlSelect($table, $col, $criteria, $col)[0][$col];
}

function sqlInsert() {
	$args = func_get_args();
	$table = $args[0];
	$query = "INSERT INTO `" . $table . "` VALUES (";
	$i = 0;
	// from args 1 to the end of array
	while (++$i < count($args)) {
		// if NULL, simply add NULL without quotes
		if ($args[$i] == "NULL") {
			$query = $query . "NULL";
		// if not NULL, add the arg with quotes
		} else {
			$query = $query . "'" . $args[$i] . "'";
		}
		// if a next arg exists, then add a comma
		if ($i < count($args) - 1) {
			$query = $query . ", ";
		}
	}
	// after all args, close the bracket
	$query = $query . ")";

	global $conn;
	// if the insert fails, show error message
	if (!($conn->query($query))) {
		die("SQL INSERT Error: " . $query . "<br>" . $conn->error);
	}
}

function sqlDelete($table, $criteria) {
	$query = "DELETE FROM `" . $table . "` WHERE " . $criteria;

	global $conn;
	// if the delete fails, show error message
	if (!($conn->query($query))) {
		die("SQL DELETE Error: " . $query . "<br>" . $conn->error);
	}
}

function sqlUpdate($table, $criteria, $column, $value) {
	$query = "UPDATE `" . $table . "` SET `" . $column . "` = '" . $value . "' WHERE " . $criteria;

	global $conn;
	// if the update fails, show error message
	if (!($conn->query($query))) {
		die("SQL UPDATE Error: " . $query . "<br>" . $conn->error);
	}
}

?>

<html>
  <head>
    <title>Second Wind</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="libraries/ajax/AjaxHelper.js"></script>
  </head>
  <body>hello<br/><a onclick="getFive()">click me</a><br/><?
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
	var_dump($resourceAlloc);
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
        <hey></hey>
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
        <div id="ghost"> <?php getEnergyAllocation() ?></div>
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