//structures that hold the units in game as well as their state (location, health...)
var enemyUnits = [];
var ownUnits = [];

//querries the database and updates enemyUnits and ownUnits
function updateLocalUnits() {

}

//parent class for all units
class Unit {
    constructor(healthPoints,level, attackCost, img, stepCost, location, attackFunction, defenseFunction) {
        this.healthPoints=healthPoints;
        this.level = level;
        this.attackCost = attackCost;
        this.img = img;
        this.stepCost = stepCost;
        this.location = location; // {x: x,y: y}
        this.attack = attackFunction;
        this.defense = defenseFunction; //defense is called when the unit gets an incoming attack
    }
    move(direction) { //direction can be: {top, down, left, right}
        //calculate target direction
        let targetLocation = {x:this.location.x, y:this.location.y};
        switch (direction) {
            case "up": targetLocation.y++; break;
            case "down": targetLocation.y--; break;
            case "right": targetLocation.x++; break;
            case "left": targetLocation.x--; break;
        }

        let validMove = true;
        //iterates through enemylist and if it encounters an enemy in the target location attacks them
        enemyUnits.forEach(enemy => {
            log(enemy.location);
            log(targetLocation);
            if(enemy.location.x==targetLocation.x && enemy.location.y==targetLocation.y){
                console.error('invalid move as there is a unit in the target location');
                validMove=false;;
            }
        });
        //if there are no units in the target location then move
        if(validMove){
            this.location=targetLocation;
        }
    }
    die(){//remove unit from list and board

    }
}

//####################################################
//#####       Subclasses for each unit          ######
//####################################################

//subclasses for each unit
class shitTroop extends Unit {
  constructor(location, level) {
    function shitAttack(direction) {
        const attackDamage = 2;
        //creates the target location at which the attack is going to be aimed
        let targetLocation = {x:this.location.x, y:this.location.y};
        switch (direction) {
            case "up": targetLocation.y++; break;
            case "down": targetLocation.y--; break;
            case "right": targetLocation.x++; break;
            case "left": targetLocation.x--; break;
        }
        //iterates through enemylist and if it encounters an enemy in the target location attacks them
        enemyUnits.forEach(enemy => {
            if(enemy.location.x==targetLocation.x && enemy.location.y==targetLocation.y){
                log('enemy attacked');
                enemy.defense(this.level*attackDamage); //pass attack to enemy unit
            }
        });
        
    }
    function shitDefense(damage) { //reduce healthpoints
        this.healthPoints=this.healthPoints-damage;
    }
    super(10*level,level, 1, "material-icons/myLocation.svg", 1, location, shitAttack, shitDefense);
    }
}

//example of how to create an use an instance of a shitTroop
var goodShit = new shitTroop({ x: 1, y: 1 }, 1);
var badShit = new shitTroop({ x: 1, y: 2 }, 1);
ownUnits.push(goodShit);
enemyUnits.push(badShit);

goodShit.attack('up');
goodShit.move('up');
goodShit.move('right');
