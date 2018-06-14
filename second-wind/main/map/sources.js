
//draws all sources
function drawAllSources() {
    element("sourceLocations").innerHTML = "";
    ajaxSources.forEach(source => {
      element("sourceLocations").appendChild(createSource(source));
    });
  }


// returns an html element for a js source object
function createSource(source) {
    let energyInitial = source.energyType.toUpperCase().charAt(0);
  
    let color = null;
    switch(energyInitial){
        case('H'): color = "green"; break;
        case('A'): color = "red"; break;
        case('P'): color = "yellow"; break;
        case('I'): color = "blue"; break;
        case('B'): color = "grey"; break;

    }
  
    let newSource = document.createElement("div");
    //newSource.classList.add();
    newSource.innerHTML = energyInitial;
    newSource.style.color = color;
    newSource.style.position = 'absolute';
    newSource.style.left = zoomPoint([source.x, source.y])[0] + "%";
    newSource.style.top = zoomPoint([source.x, source.y])[1] + "%";
  
    return newSource;
  }

  function sourceButton(source) {
    let sourceActionButton = document.createElement("a");
    sourceActionButton.classList.add("button");
    // sourceActionButton.setAttribute(
    //   "onclick",
    //   "attackPlayer(" + JSON.stringify(player) + ")"
    // );
    sourceActionButton.innerHTML = "Extract from " + source.energyType + " source";
    return sourceActionButton;
  }