<?

chdir("/home/noxiveco/public_html/secondwind/felix/");
include "libraries/database/databaseFunctions.php";

// !! this shouldnt be working right? ####################################################

// $allocation=sqlSelect('resourceAllocation','*',"username='test'",'username')[0];
// $currentEnergy=sqlSelect('energy','*',"username='test'",'username')[0];

// //updates each row in the energy table by adding the current energy and the allocation
// sqlUpdate('energy',"username='test'",'human',($allocation['human']+$currentEnergy['human']));

$oldTime = time();

for ($i=0; $i < 59; $i++) {
	// don't update the cron file, since it will take up to a minute to update
	// instead update everything inside everySecond.php, which will update every second
	include "everySecond.php";

	// we don't actually want to sleep for one second, rather we want to check whether or not 
	// one second has gone by yet, and then continue with the loop. 
	// if everysecond.php takes more than a second to run, it will get here and skip waiting entirely
	while ($oldTime >= time()) {
		usleep(100);	// sleep for 100 milliseconds
	}
	$oldTime = $oldTime + 1;	
}

$conn->close();

?>
