
//########################################################################################################################
// ##   Functions and code related to energy managament. Allocating energy values, refreshing energy values...  ##########
//########################################################################################################################


//updates energy values every second
$( document).ready(function(){
	
	var ajax = new AjaxHelper("libraries/ajax");

	var t=setInterval(updateEnergy,1000);
	function updateEnergy(){
		ajax.secureLoadVariables("ghost", {"energies": null}, function() {
			document.getElementById('humanEnergy').innerHTML = energies.human;
			document.getElementById('powerEnergy').innerHTML = energies.power;
			document.getElementById('attackEnergy').innerHTML = energies.attack;
			document.getElementById('intelligenceEnergy').innerHTML = energies.intelligence;
			document.getElementById('buildingEnergy').innerHTML = energies.building;
		}
		);
	}
});
//called at load to get the current values for allocated energy
function getEnergyAllocation(){
	var ajax = new AjaxHelper("libraries/ajax");
	ajax.secureLoadVariables("ghost", {"energyAllocation": null}, function() {
		//Update slides
		document.getElementById('human').value = energyAllocation.human;
		document.getElementById('power').value = energyAllocation.power;
		document.getElementById('attack').value = energyAllocation.attack;
		document.getElementById('intelligence').value = energyAllocation.intelligence;
		document.getElementById('building').value = energyAllocation.building;

		//update values
		document.getElementById('valueHuman').innerHTML = energyAllocation.human;
		document.getElementById('valuePower').innerHTML = energyAllocation.power;
		document.getElementById('valueAttack').innerHTML = energyAllocation.attack;
		document.getElementById('valueIntelligence').innerHTML = energyAllocation.intelligence;
		document.getElementById('valueBuilding').innerHTML = energyAllocation.building;
		
	});

}
//updates the display of submit allocation button
function doneAllocation() {
    document.getElementById("submit").style.display = "block";
}

//submits the desired energy allocation
function submitEnergyAllocation() {
		document.getElementById("submit").innerHTML = "submitting...";

		//stores the energy values in the following variables
		var human = document.getElementById("human").value;
		var attack = document.getElementById("attack").value;
		var power = document.getElementById("power").value;
		var intelligence = document.getElementById("intelligence").value;
		var building = document.getElementById("building").value;
		if (!human) {human = "0";}
		if (!attack) {attack = "0";}
		if (!power) {power = "0";}
		if (!intelligence) {intelligence = "0";}
        if (!building) {building = "0";}
		
		//submit the energy allocation
		var ajax = new AjaxHelper("libraries/ajax");
		ajax.secureCall("updateEnergyAllocation", {"human":human , "attack": attack , "power": power, "intelligence":intelligence,"building":building}, function(){
			document.getElementById("submit").innerHTML = "DONE";
			//getEnergyAllocation();
			});
}

