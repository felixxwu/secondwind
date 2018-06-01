<?

databaseConnect();
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

function sqlSelectWithoutCriteria($table,$cols,$orderby) {
	global $conn;
	$sql = "SELECT $cols FROM $table ORDER BY $orderby";
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


// returns the first row of an sql query, also gives an error if the query is empty
function sqlSelectFirstRow($table, $criteria, $sortby) {
	$result = sqlSelect($table, "*", $criteria, $sortby);
	if ($result) {
		return $result[0];
	} else {
		// error_log("SQL SELECT error: nothing matched the query. Table: $table, Criteria: $criteria");
	}
}

// (table, arg1, arg2...)
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
	// if the update fails, return false
	if (!($conn->query($query))) {
		return false;
		die("SQL UPDATE Error: " . $query . "<br>" . $conn->error);
	}
	echo "<script>console.error('inserting combination');</script>";

	//if the update is succesful return true;
	return true;
}

?>
