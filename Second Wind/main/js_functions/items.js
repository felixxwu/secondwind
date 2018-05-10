
//code to load items
var items = null;
function refreshItems(){

    //ajax call to php querry that gets the items and displays it as buttoms in main page
    //loadV("ghost","itemList","test")
}


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
loadP("errorItems","combineItems",el1,level1,el2,level2);
}