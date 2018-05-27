
//########################################################################################################
// ##   Functions and code related to item managament. Updating item lists, combining items...  ##########
//########################################################################################################


//Updates the item list
function updateItemsList(){
    // var ajax = new AjaxHelper("libraries/ajax");
    ajaxSecureLoadVariables("pablotests", {"itemList": null}, function() {
            //creates a button for each item so when they are clicked the item is added to the combining queue
		for (var i = 0; i < itemList.length; i++) {
			if(itemList[i].amount>0){
		    var button = document.createElement('button');
		    button.id=itemList[i].item.concat('*',itemList[i].Level); //* separates id and level
		    button.innerHTML = (itemList[i].item).concat('_',itemList[i].Level,' x'.concat(itemList[i].amount));
		    // 2. Append somewhere
            var body = document.getElementsByTagName("itemList")[0];
		    body.appendChild(button);
		    // 3. Add event handler
		    button.addEventListener('click', function(){
		    addToCombine(this.id);
		    });
			}
        }
        })
}

//retrieves combination times from the server and displays them.
//Also creates new items if combinations are completed
function retrieveCombinationTimes(){

    // var t=setInterval(updateCombiningEverySecond,1000);
	// function updateCombiningEverySecond(){
	// 	ajaxSecureLoadVariables("ajaxGetCombiningTimes",{"combiningTimes": null},function(){
    //         log(combiningTimes);
    //     })
    // }
    
    ajaxSecureLoadVariables("ghost",{"ajaxGetFinishedCombinations": null},function(){

        //creates new items if the combinations are finished 
        log(ajaxGetFinishedCombinations);
    })

    ajaxSecureLoadVariables("ghost",{"ajaxGetOngoingCombinations": null},function(){

        //deletes any previous display of combination progress
        var combinationsToBeRemoved = document.getElementById("combinations_progress");
        while (combinationsToBeRemoved.firstChild) {
            combinationsToBeRemoved.removeChild(combinationsToBeRemoved.firstChild);
        }
        
        //loops throgh the list of ongoing combinations
        for (var i = 0; i < ajaxGetOngoingCombinations.length; i++) {
            
            //creates an ongoing combination element
            var individualCombination = document.createTextNode(ajaxGetOngoingCombinations[i].item1 + ' is being combined with '+ ajaxGetOngoingCombinations[i].item2 + '\n');   
            
            //inserts line break
            linebreak = document.createElement("br");
            document.getElementById("combinations_progress").appendChild(linebreak);

            //appends ongoing combination progress bar
            document.getElementById("combinations_progress").appendChild(individualCombination);
            
        }
    })


    //do this every second.
        //ajax call to get combination times for all combinations
        
        //if any combination finish time is due when the update is called then delete the combination..
        //entry from the database and create the new item.

        //display remaining combination times.



}

//vars that cache the elements to be combined
var el1, el2 = null; //items to be combined
var level1, level2 = null; //level of the items to be combined
var nextEl = "el1"; //stores the last item updated

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
    log(el1);log(level1);log(el2);log(level2);
    ajaxSecureCall("ajaxCombineItems", {"el1": el1,"level1": level1,"el2": el2, "level2": level2}, function() {
        //removes list of current items
        var itemList = document.getElementById("itemList");
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
       updateItemsList();
       document.getElementById("combine").disabled = false;
       document.getElementById("combine").innerHTML ='Combine Items';
       
       
    })
    retrieveCombinationTimes();
}

//display error messages when a combination doesn't have enough items
function notEnoughItems(){
    document.getElementById("errorItems").innerHTML = "Sorry babe you don't have enough of one of the items (this message will be improved to say which item in the future";
}