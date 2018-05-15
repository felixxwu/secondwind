
function setupSliders(){

    //human slider
    var sliderH = document.getElementById("human");
    var outputH = document.getElementById("valueHuman");
    outputH.innerHTML = sliderH.value; // Display the default slider value
    
    // Update the current slider value (each time you drag the slider handle)
    sliderH.oninput = function() {
        outputH.innerHTML = this.value;
        doneAllocation();
    }

     //attack slider
     var sliderA = document.getElementById("attack");
     var outputA = document.getElementById("valueAttack");
     outputA.innerHTML = sliderA.value; // Display the default slider value
     
     // Update the current slider value (each time you drag the slider handle)
     sliderA.oninput = function() {
         outputA.innerHTML = this.value;
         doneAllocation();
     }

      //power slider
    var sliderP = document.getElementById("power");
    var outputP = document.getElementById("valuePower");
    outputP.innerHTML = sliderH.value; // Display the default slider value
    
    // Update the current slider value (each time you drag the slider handle)
    sliderP.oninput = function() {
        outputP.innerHTML = this.value;
        doneAllocation();
    }

     //intelligence slider
     var sliderI = document.getElementById("intelligence");
     var outputI = document.getElementById("valueIntelligence");
     outputI.innerHTML = sliderI.value; // Display the default slider value
     
     // Update the current slider value (each time you drag the slider handle)
     sliderI.oninput = function() {
         outputI.innerHTML = this.value;
         doneAllocation();
     }

      //building slider
    var sliderB = document.getElementById("building");
    var outputB = document.getElementById("valueBuilding");
    outputB.innerHTML = sliderB.value; // Display the default slider value
    
    // Update the current slider value (each time you drag the slider handle)
    sliderB.oninput = function() {
        outputB.innerHTML = this.value;
        doneAllocation();
    }
}