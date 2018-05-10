

//updates energy every second
var t=setInterval(updateEnergy,1000);
function updateEnergy(){
    loadP("energies","energy");
}

//updates the display of submit allocation button
function doneAllocation() {
    document.getElementById("submit").style.display = "block";
}

//submits the desired energy allocation
function submitEnergyAllocation() {
		document.getElementById("submit").innerHTML = "submitting...";

		var human = document.getElementById("human").value;
		var attack = document.getElementById("attack").value;
		var power = document.getElementById("power").value;
		var intel = document.getElementById("intel").value;
		var build = document.getElementById("build").value;

		if (!human) {human = "0";}
		if (!attack) {attack = "0";}
		if (!power) {power = "0";}
		if (!intel) {intel = "0";}
        if (!build) {build = "0";}
        
        //ajax calling php to submit energy allocation to database
		// loadP("ghost","submitAllocation", human, attack, power, intel, build);
    }
