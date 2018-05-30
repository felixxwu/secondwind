<?

chdir("/home/noxiveco/public_html/secondwind/felix/");
include "libraries/database/databaseFunctions.php";

// !! this shouldnt be working right? ####################################################

// $allocation=sqlSelect('resourceAllocation','*',"username='test'",'username')[0];
// $currentEnergy=sqlSelect('energy','*',"username='test'",'username')[0];

// //updates each row in the energy table by adding the current energy and the allocation
// sqlUpdate('energy',"username='test'",'human',($allocation['human']+$currentEnergy['human']));

for ($i=0; $i < 59; $i++) {
	// don't update the cron file, since it will take up to a minute to update
	// instead update everything inside everySecond.php, which will update every second
	include "everySecond.php";
	sleep(1);
	
}

$conn->close();

?>
