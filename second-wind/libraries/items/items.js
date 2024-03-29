//########################################################################################################
// ##   Functions and code related to item managament. Updating item lists, combining items...  ##########
//########################################################################################################

var itemList; //json array containing item list: item, level, ratios

//vars that cache the elements to be combined
var item1,
  item2 = null; //items to be combined
var level1,
  level2 = null; //level of the items to be combined
var nextItem = "item1"; //stores the last item updated

var combinationList = []; //json storing id and items of ongoing combinations

var itemRatios = null; //json storing all entries in item database so that information can be easily used without having to query the server every time

//queries the server for the item list, combination list and itemRatios and fills the corresponding local variables
function updateFactory() {
  ajaxSecureLoadVariables(
    "ghost",
    {
      getItemList: null,
      getShitList: null,
      getRatiosList: null,
      getCombinationsList: null
    },
    function() {
      newUpdateItemList(getItemList, getShitList);
      itemRatios = getRatiosList; 
      updateCombinationList(getCombinationsList);
    }
  );
}

//updates the local itemList variable
function newUpdateItemList(getItemList, getShitList) {
  var completeShitList = []; //holds the shits with their corresponding energy values
  var completeItemList = [];
  for (var i = 0; i < getItemList.length; i++) {
    //iterates through shit array and gets the energy values from the item name (as ratios are split by '@')
    completeItemList.push({
      item: getItemList[i].item,
      amount: parseInt(getItemList[i].amount),
      level: parseInt(getItemList[i].level),
      human: parseInt(getItemList[i].human),
      attack: parseInt(getItemList[i].attack),
      power: parseInt(getItemList[i].power),
      intelligence: parseInt(getItemList[i].intelligence),
      building: parseInt(getItemList[i].building)
    });
  }
  for (var i = 0; i < getShitList.length; i++) {
    //iterates through shit array and gets the energy values from the item name (as ratios are split by '@')
    var ratios = getShitList[i].item.split("@");
    completeShitList.push({
      item: getShitList[i].item,
      amount: parseInt(getShitList[i].amount),
      level: parseInt(getShitList[i].level),
      human: parseInt(ratios[1]),
      attack: parseInt(ratios[2]),
      power: parseInt(ratios[3]),
      intelligence: parseInt(ratios[4]),
      building: parseInt(ratios[5])
    });
  }
  itemList = completeItemList.concat(completeShitList);
  displayItemList();
  // log(itemList);
}


//updates the local combinationList variable
function updateCombinationList(rawList) {
  //fills combinationList
  for (var i = 0; i < rawList.length; i++) {
    combinationList.push({
      id: rawList[i].id,
      item1: rawList[i].item1,
      level1: rawList[i].level_item1,
      level2: rawList[i].level_item2,
      item2: rawList[i].item2,
      resultItem: rawList[i].result_item,
      resultItemLevel: rawList[i].result_level,
      startTime: rawList[i].start_time,
      finishTime: rawList[i].finish_time
    });
  }


  //iterates through combinationList and depending on whether the combinatin is due or not creates a new item or displays the 
  //...ongoing combination
  var d = new Date();
  var currentTime = Math.round(d.getTime() / 1000);
  for (var i = 0; i < combinationList.length; i++) {
    if (combinationList[i].finish_time>=currentTime) {
      finishCombination(combinationList[i].id);
    }else{
      item1=combinationList[i].item1;
      item2=combinationList[i].item2;
      level1=combinationList[i].level1;
      level2=combinationList[i].level2;

      
      displayCombinationBar(combinationList[i].id);
      item1=null;
      item2=null;
      level1=null;
      level2=null;

    }
  }
}

// uses the local itemList to display items into item menu;
function displayItemList() {
  var table = document.getElementById("itemList");
  //remove previous item list
  while (table.childNodes.length > 2) {
    table.removeChild(table.lastChild);
  }
  for (var i = 0; i < itemList.length; i++) {
    //creates row for itemList table
    var row = document.createElement("tr");
    row.id = itemList[i].item.concat("*", itemList[i].level);

    row.addEventListener("click", function() {
      newAddToCombine(this.id);
      displayItemInformation(this.id);
    });
    // row.addEventListener('mouseenter',function(){
    //     displayItemInformation(this.id);
    // });

    //creates columns for row
    //if column's value != 0 then add pop up color
    var popColor = "#601329";
    var item = document.createElement("td");
    var level = document.createElement("td");
    var amount = document.createElement("td");
    var human = document.createElement("td");
    if (itemList[i].human > 0) {
      human.style.background = popColor;
    }
    var attack = document.createElement("td");
    if (itemList[i].attack > 0) {
      attack.style.background = popColor;
    }
    var power = document.createElement("td");
    if (itemList[i].power > 0) {
      power.style.background = popColor;
    }

    var intelligence = document.createElement("td");
    if (itemList[i].intelligence > 0) {
      intelligence.style.background = popColor;
    }
    var building = document.createElement("td");
    if (itemList[i].building > 0) {
      building.style.background = popColor;
    }

    //fills element of columns
    item.innerHTML = itemList[i].item;
    level.innerHTML = itemList[i].level;
    amount.innerHTML = itemList[i].amount;
    human.innerHTML = itemList[i].human;
    attack.innerHTML = itemList[i].attack;
    power.innerHTML = itemList[i].power;
    intelligence.innerHTML = itemList[i].intelligence;
    building.innerHTML = itemList[i].building;

    //append columns to row
    row.appendChild(item);
    row.appendChild(level);
    row.appendChild(amount);
    row.appendChild(human);
    row.appendChild(attack);
    row.appendChild(power);
    row.appendChild(intelligence);
    row.appendChild(building);

    //appends row to table
    document.getElementById("itemList").appendChild(row);
  }
}

//adds the item with id to the combine queue (FIFO using item1,item2)
function newAddToCombine(fullItemName) {
  //fullItemName: name and level separated by *
  var split = fullItemName.split("*");
  var name = split[0];
  var level = split[1];

  if (nextItem == "item1") {
    item1 = name;
    level1 = level;
    nextItem = "item2";
  } else if (nextItem == "item2") {
    item2 = name;
    level2 = level;
    nextItem = "item1";
  }
  //display combine button when two items have been selected for combination
  var combine = document.getElementById("combine");
  combine.style.display = "none";
  if (item2 != null) {
    log(getResultItem(item1, level1, item2, level2));
    displayResultInformation(getResultItem(item1, level1, item2, level2)[2]); //array with ratios as values
    combine.style.display = "inline-block";
  }
  //displays the two elements that will be combined
  document.getElementById("testItems").innerHTML = item1
    .concat(" will be combined with ")
    .concat(item2);
}

// 1. uses local variables to update client with new ongoing combination and substracts combining items from item list (if enough)
// 2. calls relevant functions that perform 1 in the server
function newCombineItems() {
  document.getElementById("errorItems").innerHTML = "";
  // log(itemList);
  //checks that you have enough items
  //          (in the case both items of the combination are the same)
  //          or one of the items have less than 1

  var item1PresentInList = false;
  var item2PresentInList = false;
  for (var i = 0; i < itemList.length; i++) {
    if (item1 == item2 && level1 == level2) {
      //if the two items are the same then there should be at least x2 of that item
      if (
        itemList[i].item == item1 &&
        itemList[i].level == level1 &&
        itemList[i].amount <= 1
      ) {
        document.getElementById("errorItems").innerHTML =
          "Sorry shitboi you don't have enough items to do that (1)";
        return;
      }
    } //there should be at least 1 of item1 i.e. item1 should be present in itemList
    if (itemList[i].item == item1 && itemList[i].level == level1) {
      item1PresentInList = true;
    } //there should be at least 1 of item2 i.e. item2 should be present in itemList
    if (itemList[i].item == item2 && itemList[i].level == level2) {
      item2PresentInList = true;
    }
  }
  if (!(item1PresentInList && item2PresentInList)) {
    document.getElementById("errorItems").innerHTML =
      "Sorry shitboi you don't have enough items to do that (2)";
    return;
  }

  //substracts quantities from items to be combined and update display of item list
    for (var i = 0; i < itemList.length; i++) {
      // log(itemList.length);
      if (itemList[i].item == item1 && itemList[i].level == level1) {
        itemList[i].amount = itemList[i].amount - 1;
      }
      if (itemList[i].item == item2 && itemList[i].level == level2) {
        itemList[i].amount = itemList[i].amount - 1;
      }
      if (itemList[i].amount == 0) {
        itemList.splice(i, 1);
        //if the item is deleted the index will drop 1 so you need to check that same index again
        i = i - 1;
      }
  }

  displayItemList();
  //creates combination progress bar
  var resultingCombination = getResultItem(item1, level1, item2, level2);
  var resultItem = resultingCombination[0];
  var resultItemLevel = resultingCombination[1];
  var combinationTime = getCombinationTimes(item1, level1, item2, level2);
  //sets new id
  var id = 0;
  for (let i = 0; i < combinationList.length; i++) {
    if(combinationList[i].id>=id){id=combinationList[i].id;}
  }
  id++; //id is max id++;
  var d = new Date();
  var startTime = Math.round(d.getTime() / 1000);
  var finishTime = startTime + combinationTime;
  combinationList.push({
    id: id,
    item1: item1,
    level1: level1,
    level2: level2,
    item2: item2,
    resultItem: resultItem,
    resultItemLevel: resultItemLevel,
    startTime: startTime,
    finishTime: finishTime
  });
  // log(combinationList);
  displayCombinationBar(id);
  ajaxStartCombination(
    item1,
    level1,
    item2,
    level2,
    id,
    startTime,
    finishTime,
    resultItem,
    resultItemLevel
  );
  // log(combinationList);
}

//substracts relevant quantities from items in the server
//adds a combination process to the server (id corresponds to the id of the combination in the local combinationList)
function ajaxStartCombination(
  item1,
  level1,
  item2,
  level2,
  id,
  startTime,
  finishTime,
  resultItem,
  resultItemLevel
) {
  ajaxSecureCall(
    "ajaxStartCombination",
    {
      item1: item1,
      level1: level1,
      item2: item2,
      level2: level2,
      id: id,
      startTime: startTime,
      finishTime: finishTime,
      resultItem: resultItem,
      resultItemLevel: resultItemLevel
    },
    function() {
      // log("combination added");
    }
  );
}

//checks if a combination has finished in the server and if it has updates the server item list with the new item
function ajaxFinishCombination(id) {
  ajaxSecureCall("ajaxFinishCombination", { id: id }, function() {
    // log("combination finished");
  });
}

//returns in seconds that the time that item1 and item2 takes to combine
function getCombinationTimes(item1, level1, item2, level2) {
  var combinationConstant = 0.4; //scales up or down the time of all combinations
  var ratios1 = getRatios(item1);
  var ratios2 = getRatios(item2);
  var combinationTime = 0;
  for (var i = 0; i < ratios1.length; i++) {
    combinationTime =
      combinationTime + ratios1[i] * level1 + ratios2[i] * level2;
  }

  return combinationTime * combinationConstant;
}

//uses the locally stored current combination items to create a combination bar for them
function displayCombinationBar(id) {
  log(id);
  
  //gets combination time

  //creates ongoing combination elements
  var bar_holder = document.createElement("barHolder");
  var combinationText = document.createTextNode(
    item1 + " is being combined with " + item2 + "\n"
  );
  var combinationBar = document.createElement("progress_bar");
  combinationBar.id = id;
  combinationBar.className = "progress_bar";

  bar_holder.appendChild(combinationText);
  bar_holder.appendChild(combinationBar);

  // Appends progress text and progress bar to document
  document.getElementById("progress_bars").appendChild(bar_holder);

  newMoveTestBar(id);
}

//starts animation of a given combining bar (id)
//also triggers the creation of the new item once the combination is finished
function newMoveTestBar(id) {
  // log(id);

  var elem = document.getElementById(id);
  var combinationInformation = null;
  //get corresponding combination from combinationList
  for (var i = 0; i < combinationList.length; i++) {
    if (combinationList[i].id == id) {
      combinationInformation = combinationList[i];
    }
  }
  var d = new Date();
  var currentTime = Math.round(d.getTime() / 1000);
  //calculate values to update and create updatebar animation
  var width =
    ((currentTime - combinationInformation.startTime) /
      (combinationInformation.finishTime - combinationInformation.startTime)) *
    100; //starting % width (percentage of time to finish the combination)
  var remainingWidth = 100 - width; //remaining % width of combination
  var remainingTime = combinationInformation.finishTime - currentTime; //remaining time in seconds
  var stepLength = (remainingTime / remainingWidth) * 1000; //time between steps
  var combinationId = setInterval(frame, stepLength);
  function frame() {
    if (width >= 100) {
      //updates items and combination display
      finishCombination(id);
      clearInterval(combinationId);
    } else {
      width++;
      elem.style.width = width + "%";
    }
  }
}

//removes combination process from local combinationList and updates the server with relevant _finish combination_ information
function finishCombination(id) {
  //removes combination bar
  document
    .getElementById(id)
    .parentNode.parentNode.removeChild(document.getElementById(id).parentNode);
  // log("combination finished");
  newItem = null;
  newItemLevel = null;
  //removes combination item from combinationList and retrieves item that's going to be created
  for (var i = 0; i < combinationList.length; i++) {
    if (combinationList[i].id == id) {
      newItem = combinationList[i].resultItem;
      newItemLevel = combinationList[i].resultItemLevel;
      combinationList.splice(i, 1);
      // log(combinationList);
    }
  }
  addToItemList(newItem, newItemLevel);
  ajaxFinishCombination(id);
}

//adds an item to the item list and displays relevant information
function addToItemList(newItem, newItemLevel) {
  // log(newItemLevel);
  //appends new item to itemList(new item is an attribute of comb)
  //if the user has some of that item already
  for (var i = 0; i < itemList.length; i++) {
    if (itemList[i].item == newItem && itemList[i].level == newItemLevel) {
      //if the user has the same item and level
      itemList[i].amount = itemList[i].amount + 1;
      displayItemList();
      //update item list in the server
      return;
    }
  }

  //if the user has the same item but different levels
  for (var i = 0; i < itemList.length; i++) {
    if (itemList[i].item == newItem) {
      var newItem = jQuery.extend({}, itemList[i]);
      newItem.level = newItemLevel;
      newItem.amount = 1;
      itemList.push(newItem);
      displayItemList();
      return;
    }
  }

  //if that's the first occurrence of that item in the user's inventory
  ratios = getRatios(newItem);
  // newItem = "shit@" + ratios[0] + "@" + ratios[1] + "@" + ratios[2] + "@" + ratios[3] + "@" + ratios[4] + "@";
  itemList.push({
    item: newItem,
    amount: 1,
    level: newItemLevel,
    human: ratios[0],
    attack: ratios[1],
    power: ratios[2],
    intelligence: ratios[3],
    building: ratios[4]
  });
  displayItemList();
}

//returns the result item and its level from the input items
function getResultItem(item1, level1, item2, level2) {
  //calculate ratios of combining items
  ratios1 = getRatios(item1);
  ratios2 = getRatios(item2);

  //calculate raw energies of combining items
  var rawEnergies1 = ratios1;
  var rawEnergies2 = ratios2;
  for (var i = 0; i < rawEnergies1.length; i++) {
    rawEnergies1[i] = rawEnergies1[i] * level1;
    rawEnergies2[i] = rawEnergies2[i] * level2;
  }

  //calculate raw energies of resulting item
  var resultingRawEnergies = rawEnergies1;
  for (var i = 0; i < rawEnergies1.length; i++) {
    resultingRawEnergies[i] = rawEnergies1[i] + rawEnergies2[i];
  }
  //calculate level of resulting item

  resultingLevel = gcdArray(resultingRawEnergies);

  //calculate ratios of resulting item
  resultingRatios = resultingRawEnergies;
  for (var i = 0; i < resultingRatios.length; i++) {
    resultingRatios[i] = resultingRatios[i] / resultingLevel;
  }

  var resultingItem = null;

  //check if resulting ratio correspond to an existing item
  for (var i = 0; i < itemRatios.length; i++) {
    // log(itemRatios[i]);
    if (
      resultingRatios[0] == itemRatios[i].human &&
      resultingRatios[1] == itemRatios[i].attack &&
      resultingRatios[2] == itemRatios[i].power &&
      resultingRatios[3] == itemRatios[i].intelligence &&
      resultingRatios[4] == itemRatios[i].building
    ) {
      //if it does, then thats the item we need to create
      resultingItem = itemRatios[i].name;
    }
  }

  //if the resulting ratio doesnt correspond to an existing item create a shit
  if (resultingItem == null) {
    // log("shit");
    resultingItem =
      "shit@" +
      resultingRatios[0] +
      "@" +
      resultingRatios[1] +
      "@" +
      resultingRatios[2] +
      "@" +
      resultingRatios[3] +
      "@" +
      resultingRatios[4] +
      "@";
  }

  var result = [resultingItem, resultingLevel, resultingRatios];
  return result;
}

//returns array containing ratios of input item
function getRatios(item) {
  var ratios = null;

  if (item.substring(0, 5) == "shit@") {
    fakeRatios = item.split("@");
    fakeRatios.splice(0, 1);
    fakeRatios.splice(5, 1);
    //creates integer array (from string array)
    var ratios = new Array(5);
    for (var i = 0; i < fakeRatios.length; i++) {
      ratios[i] = parseInt(fakeRatios[i]);
    }
  } else {
    for (var i = 0; i < itemRatios.length; i++) {
      if (itemRatios[i].name == item) {
        var ratios = [
          itemRatios[i].human,
          itemRatios[i].attack,
          itemRatios[i].power,
          itemRatios[i].intelligence,
          itemRatios[i].building
        ];
      }
    }
  }
  return ratios;
}

//calculates gcd of two numbers
function gcd(a, b) {
  if (b == 0) {
    return a;
  }
  return gcd(b, a % b);
}

//calculates gcd of an array
function gcdArray(a) {
  return a.reduce(gcd);
}


var barCounter= 1; //used for displaying two ratio bars at a time use id as item argument
function displayItemInformation(item) {
  var fullInfo = item.split("*");
 
  let ratios =getRatios(fullInfo[0]);
  let backgroundStyle = returnLinearGradient(parseInt(ratios[0]),parseInt(ratios[1]),parseInt(ratios[2]),parseInt(ratios[3]));
  
  bar = element("ratiosBar" + barCounter);
  bar.style.background=backgroundStyle;
  bar.classList.add("movingBar");
  bar.style.width="100%";

  
  barCounter++;
  bar2 = document.createElement("bar");
  bar2.setAttribute("id","ratiosBar" + barCounter);
  element("factory_descriptions").appendChild(bar2);
  let oldBarCounter = barCounter -3;
  if(oldBarCounter>=1){
    element("ratiosBar"+ oldBarCounter).style.height=0;
    if(oldBarCounter>=2){
    oldBarCounter = barCounter -4;
    element("factory_descriptions").removeChild(element("ratiosBar"+ oldBarCounter));
    }
  }
  
 
}

var resultCounter=1;
function displayResultInformation(ratios){

  let backgroundStyle = returnLinearGradient(parseInt(ratios[0]),parseInt(ratios[1]),parseInt(ratios[2]),parseInt(ratios[3]));
  
  bar = element("resultBar" + resultCounter);
  bar.style.background=backgroundStyle;
  bar.classList.add("movingBar");
  bar.style.width="96%";

  
  resultCounter++;
  bar2 = document.createElement("resultBar");
  bar2.setAttribute("id","resultBar" + barCounter);
  element("factory_descriptions").appendChild(bar2);
  let oldBarCounter = resultCounter -2;
  if(oldBarCounter>=1){
    element("resultBar"+ oldBarCounter).style.height=0;
    if(oldBarCounter>=2){
    // oldBarCounter = resultCounter -3;
    // element("factory_descriptions").removeChild(element("resultBar"+ oldBarCounter));
    }
  }
}

function returnLinearGradient(r1,r2,r3,r4){ //returns the value for css background so it displays a bar with the ratios displayed visually
  let total = r1+r2+r3+r4;
  return "linear-gradient(to right, red " + r1/total*100 + "%, blue " + r1/total*100 + "%, blue " + (r1+r2)/total*100 + "%, yellow " + 
      (r1+r2)/total*100 + "%, yellow " +(r1+r2+r3)/total*100 + "%, green " + (r1+r2+r3)/total*100 + "%";
  
}


function showFactoryMenu(){
  show('factory_menu','fadeInUp', 2);
  hide('analytics','fadeOutRight', 2);
  hide('notifications','fadeOutLeft', 2);
  //hide Island (wait until the menu has slided in)
  setTimeout(hideIsland, 300);
  function hideIsland(){
    element('mainLayout').style.display='none';
  }
}

function hideFactoryMenu(){
  hide('factory_menu','fadeOutDown', 1);
  show('analytics','fadeInRight', 2);
  show('notifications','fadeInLeft', 2)
  //hide Island
  
  element('mainLayout').style.display='block';
}