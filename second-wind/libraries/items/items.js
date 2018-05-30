
//########################################################################################################
// ##   Functions and code related to item managament. Updating item lists, combining items...  ##########
//########################################################################################################

var itemList; //json array containing item list: item, level, ratios

//vars that cache the elements to be combined
var item1, item2 = null; //items to be combined
var level1, level2 = null; //level of the items to be combined
var nextItem = "item1"; //stores the last item updated

var combinationList = []; //json storing id and items of ongoing combinations

//queries the server for the item list and fills the corresponding local variables 
function newUpdateItemList(){
    ajaxSecureLoadVariables("ghost", {"getItemList": null, "getShitList": null}, function() {
        var completeShitList =[]; //holds the shits with their corresponding energy values
        for (var i = 0; i < getShitList.length; i++) {
            //iterates through shit array and gets the energy values from the item name (as ratios are split by '@')
            var ratios = getShitList[i].item.split("@");
            completeShitList.push({item: getShitList[i].item, amount: getShitList[i].amount, level: getShitList[i].level, human: ratios[1], attack: ratios[2], power: ratios[3], intelligence: ratios[4], building: ratios[5]});
        }
        itemList = getItemList.concat(completeShitList);
        displayItemList();
    });
}

// uses the local itemList to display items into item menu;
function displayItemList(){

    var table= document.getElementById("itemList");
    //remove previous item list
    while (table.childNodes.length > 2) {
        table.removeChild(table.lastChild);
    }
    for (var i = 0; i < itemList.length; i++) {

        //creates row for itemList table
        var row = document.createElement('tr');

        //creates columns for row
        var item = document.createElement('th');
        var level = document.createElement('th');
        var amount = document.createElement('th');
        var human = document.createElement('th');
        var attack = document.createElement('th');
        var power = document.createElement('th');
        var intelligence = document.createElement('th');
        var building = document.createElement('th');
        var combine = document.createElement('th');
        
        //fills element of columns
        item.innerHTML = itemList[i].item;
        level.innerHTML = itemList[i].level;
        amount.innerHTML = itemList[i].amount;
        human.innerHTML = itemList[i].human;
        attack.innerHTML = itemList[i].attack;
        power.innerHTML = itemList[i].power;
        intelligence.innerHTML = itemList[i].intelligence;
        building.innerHTML = itemList[i].building;
        
       
        //creates combine button
        var button = document.createElement('button');
        // button.setAttribute("type", "button");
        //the id of the button holds the information needed for future item combinations
        button.id=itemList[i].item.concat('*',itemList[i].level); //* separates id and level
        button.innerHTML='Add to combine';
        //add event handler
        button.addEventListener('click', function(){
            newAddToCombine(this.id);
            });
        combine.appendChild(button);

        //append columns to row
        row.appendChild(item);
        row.appendChild(level);
        row.appendChild(amount);
        row.appendChild(human);
        row.appendChild(attack);
        row.appendChild(power);
        row.appendChild(intelligence);
        row.appendChild(building);
        row.appendChild(combine);

        //appends row to table
        document.getElementById("itemList").appendChild(row);
        }
}

//adds the item with id to the combine queue (FIFO using item1,item2)
function newAddToCombine(id) { 
    //id: name and level separated by *
    var split = id.split('*');
    var name = split[0];
    var level = split[1];

    if(nextItem=="item1"){
        item1=name;
        level1=level;
        nextItem="item2";
    }
    else if(nextItem=="item2"){
        item2=name;
        level2=level;
        nextItem="item1";
    }
    //display combine button when two items have been selected for combination
    var combine = document.getElementById('combine');
    combine.style.display = 'none';
    if(item2!=null){
        combine.style.display = 'block';
    }
    //displays the two elements that will be combined
    document.getElementById("testItems").innerHTML = item1.concat(" will be combined with ").concat(item2);
}

// 1. updates client with new ongoing combination and substracts combining items from item list (if enough)
// 2. does 1 on the server
function newCombineItems(){
    document.getElementById("errorItems").innerHTML ="";
    //checks that you have enough items (in the case both items of the combination are the same)
    if(item1==item2 && level1==level2){
        for (var i = 0; i < itemList.length; i++) {
            if(itemList[i].item==item1 && itemList[i].level==level1){
                
                if(itemList[i].amount<=1){
                    document.getElementById("errorItems").innerHTML = "Sorry shitboi you don't have enough items to do that";         
                    return;
                }
                //if the two items are the same then there should be at least x2 of that item
            }
        }
    }

    //substracts quantities from items to be combined and update display of item list
    for (var i = 0; i < itemList.length; i++) {
        if(itemList[i].item==item1 && itemList[i].level==level1){ itemList[i].amount=itemList[i].amount-1;}
        if(itemList[i].item==item2 && itemList[i].level==level2){ itemList[i].amount=itemList[i].amount-1;}
    }
    displayItemList();

    //creates combination progress bar
    var resultItem = null;//getResultItem();
    var combinationTime = 7;
    var id = 'id-' + Math.random().toString(36).substr(2, 16);
    var d = new Date();
    var startTime= Math.round(d.getTime()/1000);
    var finishTime=startTime+combinationTime; 
    combinationList.push({id: id,item1:item1,level1:level1,level2:level2,item2:item2,resultItem:resultItem,startTime:startTime,finishTime:finishTime});
    displayCombinationBar(id);
    
    log(combinationList);
    
}

//uses the locally stored current combination items to create a combination bar for them
function displayCombinationBar(id){
    //gets combination time

    //creates ongoing combination elements
    var combinationText = document.createTextNode(item1 + ' is being combined with '+ item2 + '\n');   
    var combinationBar = document.createElement('progress_bar');
    combinationBar.id=id; 
    combinationBar.className="progress_bar";
    
    // Appends progress text and progress bar to document
    document.getElementById("progress_bars").appendChild(combinationText);
    document.getElementById("progress_bars").appendChild(combinationBar);

    newMoveTestBar(id);
}

//starts animation of a given combining bar (id)
//also triggers the creation of the new item once the combination is finished
function newMoveTestBar(id){
    var elem = document.getElementById(id);   
    var combinationInformation=null;
    //get corresponding combination from combinationList
		for (var i = 0; i < combinationList.length; i++) {
            if(combinationList[i].id==id){
                combinationInformation=combinationList[i];
            }
        }
    var d = new Date();
    var currentTime= Math.round(d.getTime()/1000);
    //calculate values to update and create updatebar animation
    var width = (currentTime-combinationInformation.startTime)/(combinationInformation.finishTime-combinationInformation.startTime)*100; //starting % width (percentage of time to finish the combination)
    var remainingWidth = 100-width; //remaining % width of combination
    var remainingTime = (combinationInformation.finishTime-combinationInformation.startTime)/100*remainingWidth; //remaining time in seconds
    log(remainingTime);
    var stepLength= remainingTime/remainingWidth*100; //time between steps 
    var combinationId = setInterval(frame, stepLength);
    function frame() {
        if (width >= 100) {
        //updates items and combination display
        finishCombination(id);
        clearInterval(combinationId);
        } else {
        width=width+0.1; 
        elem.style.width = width + '%'; 
        }
    }
 
}
function finishCombination(id){
    //removes combination bar
    document.getElementById(id).parentNode.parentNode.parentNode.removeChild(document.getElementById(id).parentNode.parentNode);
    log("combination finished");
    createNewItem();
    // document.getElementById(id).remove();
}

//finds out the product item of two input items, updates the item list with it and then updates the server with the new creation.
function createNewItem(item1,level1,item2,level2){

}











// OLD ITEM FUNCTIONS


//Updates the item list
function updateItemsList(){
    //deletes any previous display of items
    // var itemList = document.getElementById("itemList");
    // while (itemList.firstChild) {
    //     itemList.removeChild(itemList.firstChild);
    // }
    
    // var ajax = new AjaxHelper("libraries/ajax");
    ajaxSecureLoadVariables("pablotests", {"itemList": null}, function() {
        document.getElementById("itemList").innerHTML="";
        
            //creates a button for each item so when they are clicked the item is added to the combining queue
		for (var i = 0; i < itemList.length; i++) {
			//creates item element
            var button = document.createElement('item');
            button.setAttribute("type", "button");
            button.id=itemList[i].item.concat('*',itemList[i].Level); //* separates id and level

            //text description of item and amount description
            itemText=document.createElement('description');
            amountText=document.createElement('amount');
            itemText.innerHTML = (itemList[i].item).concat(' level ',itemList[i].Level);
            amountText.innerHTML = 'x'.concat(itemList[i].amount);
            
            button.appendChild(itemText);
            button.appendChild(amountText);

            //append corresponding image to button
            button.style.backgroundImage = "url(../../secondwind/pabloNEW/images/".concat(itemList[i].item,".svg)");
		    //append button in item list
            document.getElementsByTagName("itemList")[0].appendChild(button);;
		    
		    // 3. Add event handler
		    button.addEventListener('click', function(){
		    addToCombine(this.id);
		    });
			}
        
        })
}

//retrieves combination times from the server and displays them.
//Also creates new items if combinations are completed
function retrieveCombinationTimes(){

    //disables button
    document.getElementById("updateCombinations").innerHTML="updating...";
    document.getElementById("updateCombinations").disabled = true;

    
    //creates new items if the combinations are finished 
    ajaxSecureLoadVariables("ghost",{"ajaxGetFinishedCombinations": null},function(){

        updateItemsList();
        // log(ajaxGetFinishedCombinations);
    })

    //updates the display of ongoing combinations
    ajaxSecureLoadVariables("ghost",{"ajaxGetOngoingCombinations": null},function(){

        //deletes any previous display of combination progress
        var combinationsToBeRemoved = document.getElementById("progress_bars");
        while (combinationsToBeRemoved.firstChild) {
            combinationsToBeRemoved.removeChild(combinationsToBeRemoved.firstChild);
        }
        
        //loops throgh the list of ongoing combinations
        for (var i = 0; i < ajaxGetOngoingCombinations.length; i++) {
            
            //creates ongoing combination elements
            var combinationText = document.createTextNode(ajaxGetOngoingCombinations[i].item1 + ' is being combined with '+ ajaxGetOngoingCombinations[i].item2 + '\n');   
            var combinationBar = document.createElement('progress_bar');
            combinationId = ajaxGetOngoingCombinations[i].id;
            combinationBar.id=combinationId; 
            combinationBar.className="progress_bar";
            
            // Appends progress text and progress bar to document
            document.getElementById("progress_bars").appendChild(combinationText);
            document.getElementById("progress_bars").appendChild(combinationBar);
        }
        //updates the starting percentage and speed of all combiningbars
        updateCombiningBars();

        //sets combine items button back to normal
        document.getElementById("updateCombinations").disabled = false;
        document.getElementById("updateCombinations").innerHTML="Update Combinations";
    
    })

    



}

// //vars that cache the elements to be combined
// var el1, el2 = null; //items to be combined
// var level1, level2 = null; //level of the items to be combined
// var nextEl = "el1"; //stores the last item updated

//adds the item with id to the combine queue (FIFO using el1,el2)
function addToCombine(id) { 
    //id: name and level separated by *
    var split = id.split('*');
    var name = split[0];
    var level = split[1];
    // log(name);
    // log(level);
    if(nextEl=="el1"){
        el1=name;
        level1=level;
        nextEl="el2";
        // log('el1 is next')
          
    }
    else if(nextEl=="el2"){
        el2=name;
        level2=level;
        nextEl="el1";
        // log('el2 is next')
    }
    var combine = document.getElementById('combine');
    combine.style.display = 'none';
    if(el2!=null){
        combine.style.display = 'block';
    }
    //displays the two elements that will be combined
    document.getElementById("testItems").innerHTML = el1.concat(" will be combined with ").concat(el2);
}

//calls the relevant functions to combine two items and generate a new one
function combineItems(){
    document.getElementById("combine").innerHTML ='combining...';
    document.getElementById("combine").disabled = true;
    document.getElementById("errorItems").innerHTML ='';
    // var ajax = new AjaxHelper("libraries/ajax");
    //generates unique id for combination
    var uniqueId = 'id-' + Math.random().toString(36).substr(2, 16);
 
    ajaxSecureCall("ajaxCombineItems", {"id":uniqueId,"el1": el1,"level1": level1,"el2": el2, "level2": level2}, function() {
       document.getElementById("combine").disabled = false;
       document.getElementById("combine").innerHTML ='Combine Items';

       //updates combination bars
       updateItemsList();
       retrieveCombinationTimes();
    });
}

//display error messages when a combination doesn't have enough items
function notEnoughItems(){
    document.getElementById("errorItems").innerHTML = "Sorry babe you don't have enough of one of the items (this message will be improved to say which item in the future";
}


//calls moveTestBar for all bars in document
function updateCombiningBars(){
    var progressBars = document.getElementsByClassName("progress_bar");
    for (i = 0; i < progressBars.length; i++) {
        moveTestBar(progressBars[i].id);
    }
}

function moveTestBar(id){
    var elem = document.getElementById(id);   

    //querry server using id to get starting percentage and remaining combination time
    ajaxSecureLoadVariables("ghost",{"ajaxGetCombiningTimes": id},function(){
        if(ajaxGetCombiningTimes==0){return;}
        var start = ajaxGetCombiningTimes[0].start_time; //starting time of combination
        var finish=ajaxGetCombiningTimes[0].finish_time; //finishing time of combination

        //get current timestamp
        var d = new Date();
        var currentTime= Math.round(d.getTime()/1000);

        //calculate values to update and create updatebar animation
        var width = (currentTime-start)/(finish-start)*100; //starting % width (percentage of time to finish the combination)
        var remainingWidth = 100-width; //remaining % width of combination
        var remainingTime = (finish-start)/100*remainingWidth; //remaining time in seconds
        var stepLength= remainingTime/remainingWidth*100; //time between steps 
        var id = setInterval(frame, stepLength);
        function frame() {
            if (width >= 100) {
            //updates items and combination display
            retrieveCombinationTimes();
            clearInterval(id);
            } else {
            width=width+0.1; 
            elem.style.width = width + '%'; 
            }
    }

    })

    
      
}