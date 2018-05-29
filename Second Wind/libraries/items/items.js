
//########################################################################################################
// ##   Functions and code related to item managament. Updating item lists, combining items...  ##########
//########################################################################################################


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
    //generates unique id for combination
    var uniqueId = 'id-' + Math.random().toString(36).substr(2, 16);
 
    ajaxSecureCall("ajaxCombineItems", {"id":uniqueId,"el1": el1,"level1": level1,"el2": el2, "level2": level2}, function() {
       document.getElementById("combine").disabled = false;
       document.getElementById("combine").innerHTML ='Combine Items';

       //updates combination bars
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