
//code to load items

function updateItemsList(){
    var ajax = new AjaxHelper("libraries/ajax");
    ajax.loadVariables("pablotests", {"itemList": null}, function() {
            //creates a button for each item so when they are clicked the item is added to the combining queue
		for (var i = 0; i < itemList.length; i++) {
			if(itemList[i].amount>0){
		    var button = document.createElement('button');
		    button.id=itemList[i].item.concat('*',itemList[i].Level); //* separates id and level
		    button.innerHTML = (itemList[i].item).concat('_',itemList[i].Level,' x'.concat(itemList[i].amount));
		    // 2. Append somewhere
            var body = document.getElementsByTagName("itemList")[0];
            log(body);
		    body.appendChild(button);
		    // 3. Add event handler
		    button.addEventListener('click', function(){
		    addToCombine(this.id);
		    });
			}
        }
        })
}

var items = null;
//vars that stores the elements to combine
var el1, el2 = null; //items to be combined
var level1, level2 = null; //level of the items to be combined
var nextEl = "el1"; //stores the last item updated

//updates el1,el2 so they hold the items that need to be combined
function addToCombine(id) { //FIFO using el1 and el2 to store combination of elemnt
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



//combines el1 and el2 to create a new item
function combineItems(){
    var ajax = new AjaxHelper("libraries/ajax");
    ajax.call("combineItems", {"el1": el1,"level1": level1,"el2": el2, "level2": level2}, function() {
       // updateItemsList();
    })
    
// USE CALL TO UPDATE DATABASE ABOUT COMBINEITEMS AND THEN REFRESH ITEM LIST
}