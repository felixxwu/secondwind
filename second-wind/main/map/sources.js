
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
    newSource.classList.add("source");
    newSource.innerHTML = energyInitial;
    newSource.style.backgroundImage = "radial-gradient(circle at center, " + color + " 0, #ffffff00 30%)";
    
    //set position and size of sources
    if(zoomed==null){ //if the map is not zoomed
      newSource.style.padding = "10%";
      newSource.style.left = (zoomPoint([source.x, source.y])[0]-10) + "%";
      newSource.style.top = (zoomPoint([source.x, source.y])[1]-10) + "%";
    }else{ //zoomGridSize
      let newPadding = 10*zoomGridSize;
      newSource.style.padding = newPadding + "%";
      newSource.style.left = (zoomPoint([source.x, source.y])[0]-newPadding) + "%";
      newSource.style.top = (zoomPoint([source.x, source.y])[1]-newPadding) + "%";
    }
    return newSource;
  }

  function displaySourceUI(source) {
    element("selectedSources").style.display = "";
    element("selectedSources").innerHTML="source selected";

    //list of extractors of source.energyType kind
    let extractorList = [];

    //check if user has an extractor of that kind and adds them to extractorList
    for (let i = 0; i < itemList.length; i++) {
      if(itemList[i].item===source.energyType + "_extractor"){
        extractorList.push(itemList[i]);
      }
    }
    if (extractorList.length==0){
      log("extractor not available");
    }

    //create buttons for each extractor that could be use in the source
    for (let i = 0; i < extractorList.length; i++) {
      let extractorButton = document.createElement("a");
      extractorButton.classList.add("button");
      extractorButton.setAttribute(
      "onclick",
      "startExtraction("  + JSON.stringify(extractorList[i]) + "," + JSON.stringify(source) +")"
      );
      extractorButton.innerHTML = "Use extractor level " + extractorList[i].level;
      element("selectedSources").appendChild(extractorButton);
    }

    // element("selectedSources").appendChild(sourceButton(source));
    // let sourceActionButton = document.createElement("a");
    // sourceActionButton.classList.add("button");
    // sourceActionButton.setAttribute(
    //   "onclick",
    //   "startExtraction("  + JSON.stringify(source) + ")"
    // );
    // sourceActionButton.innerHTML = "Extract from " + source.energyType + " source";
    // return sourceActionButton;
  }


//needs to be implemented
function getExtractionRate(extractorLevel,sourceId){
  return 10;
  
}

function startExtraction(extractor,source){

  //remove item from itemList
  for (let i = 0; i < itemList.length; i++) {
    if(itemList[i].item==extractor.item && itemList[i].level==extractor.level){
      itemList[i].amount-=1;
      //if you don't have any more extractors of that same level
      if(itemList[i].amount==0){
        itemList.splice(i,1);
      }
    }
    break;
  }
  element("selectedSources").innerHTML="Extraction process started";
  displayItemList();

  
  //add extraction process to extractionProcesses
  // calculates the rate at which the user will take from the extractor
  let rate = getExtractionRate(extractor.level,source.id);
  extractionProcesses.push({
  source_id: source.id,
  extractor_level: extractor.level,
  energy_type: source.energyType,
  rate: rate,
  amount: parseInt(source.amount)
  });

  //update database with -1 for extractor and new extraction process
  ajaxSecureCall(
    "startExtractionProcess",
    {extractorName: extractor.item, extractorLevel: extractor.level, id:source.id},
    function() {
      log('finished');
    }
);
}

