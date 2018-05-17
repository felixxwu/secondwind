
//########################################################################################################
// ##   Functions and code related to item managament. Updating item lists, combining items...  ##########
//########################################################################################################


//Updates the item list
function updateItemsList(){
    var ajax = new AjaxHelper("libraries/ajax");
    ajax.secureLoadVariables("pablotests", {"itemList": null}, function() {
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

//vars that store the elements to be combined
var el1, el2 = null; //items to be combined
var level1, level2 = null; //level of the items to be combined
var nextEl = "el1"; //stores the last item updated

//adds the item with id to the combine queue (FIFO using el1,el2)
function addToCombine(id) { 
    //id: name and level separated by *
    var split = id.split('*');
    var name = split[0];
    var level = split[1];
    if(nextEl=="el1"){
        el1=name;
        level1=level;
        nextEl="el2";
    }
    else if(nextEl=="el2"){
        el2=name;
        level2=level;
        nextEl="el1";
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
    var ajax = new AjaxHelper("libraries/ajax");
    ajax.secureCall("combineItems", {"el1": el1,"level1": level1,"el2": el2, "level2": level2}, function() {
        //removes list of current items
        var itemList = document.getElementById("itemList");
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
       updateItemsList();
       document.getElementById("combine").disabled = false;
       document.getElementById("combine").innerHTML ='Combine Items';
       
       
    })
}

//display error messages when a combination doesn't have enough items
function notEnoughItems(){
    document.getElementById("errorItems").innerHTML = "Sorry babe you don't have enough of one of the items (this message will be improved to say which item in the future";
}