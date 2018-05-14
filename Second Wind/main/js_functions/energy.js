

$( document).ready(function(){
	var ajax = new AjaxHelper("libraries/ajax");
	//updates energy every second
	var t=setInterval(updateEnergy,1000);
	function updateEnergy(){
		ajax.loadVariables("ghost", {"energies": null}, function() {
			document.getElementById('humanEnergy').innerHTML = energies.human;
			document.getElementById('powerEnergy').innerHTML = energies.power;
			document.getElementById('attackEnergy').innerHTML = energies.attack;
			document.getElementById('intelligenceEnergy').innerHTML = energies.intelligence;
			document.getElementById('buildingEnergy').innerHTML = energies.building;
		}
		);
}
});


 

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
		var intelligence = document.getElementById("intelligence").value;
		var building = document.getElementById("building").value;
		log(human);
		if (!human) {human = "0";}
		if (!attack) {attack = "0";}
		if (!power) {power = "0";}
		if (!intelligence) {intelligence = "0";}
        if (!building) {building = "0";}
		
		var ajax = new AjaxHelper("libraries/ajax");
		ajax.call("updateEnergyAllocation", {"human":human , "attack": attack , "power": power, "intelligence":intelligence,"building":building}, function(){
			document.getElementById("submit").innerHTML = "DONE";
			});
		
   
}

