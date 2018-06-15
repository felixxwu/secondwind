
var extractionProcesses = [];

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
    sourceActionButton.setAttribute(
      "onclick",
      "startExtraction("  + JSON.stringify(source) + ")"
    );
    sourceActionButton.innerHTML = "Extract from " + source.energyType + " source";
    return sourceActionButton;
  }

  function startExtraction(source){
  
    //check if user has an extractor of that kind
    for (let i = 0; i < itemList.length; i++) {
      if(itemList[i].item===source.energyType + "_extractor"){
        //if the user has an extractor of that energy kind then use it (it will use the first one)
        //calculates the rate at which the user will take from the extractor
        let rate = getExtractionRate(itemList[i].level,source.id);
        extractionProcesses.push({
        source_id: source.id,
        extractor_level: itemList[i].level,
        energy_type: source.energyType,
        rate: rate,
        amount: parseInt(source.amount)
        });

        //remove extractor from item list
        itemList.splice(i, 1);
        displayItemList();

        //update database
        ajaxAddExtractionProcess(source.id,itemList[i].level);
        break;
      }else{
        log('extractor not available');
      }
    } 

  }

//needs to be implemented
function getExtractionRate(extractorLevel,sourceId){
  return 10;
  
}

//removes extractor from itemList and creates extraction process
//needs to be implemented
function ajaxAddExtractionProcess(id,extractorLevel){

}