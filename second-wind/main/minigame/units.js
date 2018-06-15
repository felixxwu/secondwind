
//parent class for all units
class Unit {
    constructor(level,attackCost,img,stepCost,location,attackFunction,defenseFunction) {
        this.level=level; 
        this.attackCost=attackCost;
        this.img=img;
        this.stepCost=stepCost;
        this.location=location; //[x,y]
        this.attack=attackFunction;
        this.defense=defenseFunction;
    }
    move(direction){ //direction could be: top, down, left, right
        switch(direction){
            case "up": log('up');this.location[1]++;break;
            case "down": this.location[1]--;break;
            case "right": this.location[0]++;break;
            case "left": this.location[0]--;break;
        }
        log('moved');
    }
}

//subclasses for each unit
class shitTroop extends Unit{
constructor(location,level) {
    function shitAttack(){
        log('attack');
    }
    function shitDefense(){
        log('defense');
    }
    super(level,1,"shit.svg",1,location,shitAttack,shitDefense);
    }
}

//example of how to create an use an instance of a shitTroop
var shitInstance = new shitTroop([1,1],1);
shitInstance.move('up');
shitInstance.test();
shitInstance.attack();
shitInstance.defense();
log(shitInstance);