//structures that hold the units in game as well as their state (location, health...)
var enemyUnits = [];
var ownUnits = [];

//querries the database for enemyUnits and ownUnits
function updateLocalUnits() {

}

//parent class for all units
class Unit {
    constructor(level, attackCost, img, stepCost, location, attackFunction, defenseFunction) {
        this.level = level;
        this.attackCost = attackCost;
        this.img = img;
        this.stepCost = stepCost;
        this.location = location; // {x: x,y: y}
        this.attack = attackFunction;
        this.defense = defenseFunction;
    }
    move(direction) { //direction could be: top, down, left, right
        switch (direction) {
            case "up": log('up'); this.location.y++; break;
            case "down": this.location.y--; break;
            case "right": this.location.x++; break;
            case "left": this.location.x--; break;
        }
        log('moved');
    }
}
//####################################################
//#####       Subclasses for each unit          ######
//####################################################

//subclasses for each unit
class shitTroop extends Unit {
  constructor(location, level) {
    function shitAttack(direction) {
      //iterates through enemylist and if it encounters an enemit in the target location substract level
        let targetLocation = this.location;
        log(targetLocation);
    }
    function shitDefense() {
    }
    super(level, 1, "shit.svg", 1, location, shitAttack, shitDefense);
    }
}

//example of how to create an use an instance of a shitTroop
var shitInstance = new shitTroop({ x: 1, y: 1 }, 1);
shitInstance.move('up');
shitInstance.attack('right');
shitInstance.defense();
