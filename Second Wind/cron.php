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

function sqlSelect($table,$rows,$criteria,$orderby) {
	global $conn;
	$sql = "SELECT $rows FROM $table WHERE $criteria ORDER BY $orderby";
	$result = $conn->query($sql);
	$rows = $result->fetch_assoc();

	if (!$result) { // if result failed
		die("SQL SELECT Error: " . $sql . "<br>" . $conn->connect_error);
	}
	return $rows;
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



databaseConnect();

$allocation=sqlSelect('resourceAllocation','*',"username='test'",'username');
$currentEnergy=sqlSelect('energy','*',"username='test'",'username');

//updates each row in the energy table by adding the current energy and the allocation
sqlUpdate('energy',"username='test'",'human',($allocation['human']+$currentEnergy['human']));

function update() {
    $allocation=sqlSelect('resourceAllocation','*',"username='test'",'username');
    $currentEnergy=sqlSelect('energy','*',"username='test'",'username');

    //updates each row in the energy table by adding the current energy and the allocation
    sqlUpdate('energy',"username='test'",'human',($allocation['human']+$currentEnergy['human']));
    sqlUpdate('energy',"username='test'",'attack',($allocation['attack']+$currentEnergy['attack']));
    sqlUpdate('energy',"username='test'",'power',($allocation['power']+$currentEnergy['power']));
    sqlUpdate('energy',"username='test'",'intelligence',($allocation['intelligence']+$currentEnergy['intelligence']));
    sqlUpdate('energy',"username='test'",'building',($allocation['building']+$currentEnergy['building']));

}
for ($i=0; $i < 59; $i++) {
  update();
  sleep(1);
}


$conn->close();
?>
