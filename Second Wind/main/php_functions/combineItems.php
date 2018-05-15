<?php
//global $el1, $el2, $level1, $level2, $el1Result, $el2Result, $el1Amount, $el2Amount, $el1Energies, $el2Energies,$sumEnergies,$level,$ratio,$newItem,$newItemAmount;

//functions
function getAmounts(){
  echo("<script>console.log('items');</script>");
  // global $el1, $el2, $level1, $level2, $el1Result, $el2Result;
  // //get amount of el1 and el2
  // $el1Result = sqlSelect('usersItems','amount',"username='test' and item = '".$el1."' and Level =".$level1,"amount");
  // $el2Result = sqlSelect('usersItems','amount',"username='test' and item = '".$el2."' and Level =".$level2,"amount");

} //get amount of el1 and el2
function enoughItems(){ //checks if there are enough of the items to combine them
  global $el1, $el2, $level1, $level2, $el1Result, $el2Result;
  //this accounts for the case in which you are trying to combine one item with itself but you only have 1
  if($el1==$el2&$level1==$level2&$el1Result[0]['amount']==1){
    echo("you dont have enough items!");
    exit;
  }

  //this account for the case in which you don't have enough items
  if($el1Result[0]['amount']<1 or $el2Result[0]['amount']<1){
    echo("you dont have enough items!");
    exit;
  }
}
function subtractQuantities(){ //subtracts quantities from used itemList
  global $el1, $el2, $level1, $level2, $el1Result, $el2Result, $el1Amount, $el2Amount;
  //updates element1 with -1 quantity
  $el1Amount = $el1Result[0]['amount']-1;
  sqlUpdate("usersItems", "username='test' and item = '".$el1."' and Level=".$level1,'amount', $el1Amount);

  //queries the second element again in case el1=el2
  $el2Result = sqlSelect('usersItems','amount',"username='test' and item = '".$el2."' and Level =".$level2,"amount");

  //updates element2 with -1 quantity
  $el2Amount = $el2Result[0]['amount']-1;
  sqlUpdate("usersItems", "username='test' and item = '".$el2."' and Level=".$level2,'amount', $el2Amount);

  //updates with new quantities
  echo("<script>refreshItems();</script>");
  echo($el2amount);
}
function getEnergyValues(){ //gets the energy values corresponding to el1 and el2
  global $el1, $el2, $level1, $level2, $el1Result, $el2Result, $el1Amount, $el2Amount, $el1Energies, $el2Energies;


  //gets the ratios for both items and stores them in $el1Energies and $el2Energies
  $cols = 'human, attack, power, intelligence, building';
  $el1Energies  = sqlSelect('items',$cols,"name = '".$el1."'","name")[0];
  $el2Energies  = sqlSelect('items',$cols,"name = '".$el2."'","name")[0];


  //this is the case the items are shits (not predefined items) in which ratios are separated by @
  if(substr( $el1, 0, 5 ) === "shit@"){
    $energies = explode("@", $el1);
    $el1Energies=array('human'=>$energies[1],'attack'=>$energies[2],'power'=>$energies[3],'intelligence'=>$energies[4],'building'=>$energies[5]);
  }
  if(substr( $el2, 0, 5 ) === "shit@"){
    $energies = explode("@", $el2);
    $el2Energies=array('human'=>$energies[1],'attack'=>$energies[2],'power'=>$energies[3],'intelligence'=>$energies[4],'building'=>$energies[5]);
  }

  //multiplies by level to get energy levels (instead of the ratios)
  foreach($el1Energies as &$value){
    $value=$value*$level1;
  }
  foreach($el2Energies as &$value){
    $value=$value*$level2;
  }
}
function newEnergyValues(){//creates the new energy values
  global $el1, $el2, $level1, $level2, $el1Result, $el2Result, $el1Amount, $el2Amount, $el1Energies, $el2Energies, $sumEnergies;

  $sumEnergies = array($el1Energies['human']+$el2Energies['human'],$el1Energies['attack']+$el2Energies['attack'],
              $el1Energies['power']+$el2Energies['power'],$el1Energies['intelligence']+$el2Energies['intelligence'],
              $el1Energies['building']+$el2Energies['building']);
}
function gcd($a, $b){//returns greatest common divior between two numbers
    if ($a == 0 || $b == 0)
        return abs( max(abs($a), abs($b)) );

    $r = $a % $b;
    return ($r != 0) ?
        gcd($b, $r) :
        abs($b);
}
function gcd_array($array, $a = 0){
    $b = array_pop($array);
    return ($b === null) ?
        (int)$a :
        gcd_array($array, gcd($a, $b));
}
function newRatio(){ //calculates the ratio of the combination
  global $el1, $el2, $level1, $level2, $el1Result, $el2Result, $el1Amount, $el2Amount, $el1Energies, $el2Energies, $sumEnergies,$level,$ratio;

  // removes 0s from array as if not the gcd of an item with some energy values 0 will return 0 as gcd
  $energiesWithout0s = array();
  foreach ($sumEnergies as &$value) {
      if($value!=0){

        array_push($energiesWithout0s,$value);
      }else{

      }
  }

  // returns gdc of an array of numbers
  $level=gcd_array($energiesWithout0s);

  //calculate ratio of new element gcd as level and energies/gcd as ratio
  $ratio=array();

  foreach($sumEnergies as &$value){

    array_push($ratio,$value/$level);
  }

}
function newItem(){ //creates/updates the new/existing item's quantity with ratio: newRatio
  global $el1, $el2, $level1, $level2, $el1Result, $el2Result, $el1Amount, $el2Amount, $el1Energies, $el2Energies, $sumEnergies,$level,$ratio,$newItem,$newItemAmount;

  $newItem=sqlSelect('items','name',"human = ".$ratio[0]." and attack = ".$ratio[1].
           " and power = ". $ratio[2]." and intelligence = ".$ratio[3].
           " and building = ".$ratio[4],"name")[0]['name'];

  //if the ratio doesnt match an existing item a shit is created
  if($newItem==null){ $newItem='shit@'.$ratio[0].'@'.$ratio[1].'@'.$ratio[2].'@'.$ratio[3].'@'.$ratio[4].'@';}

  //gets the number of $newItem the user already has
  $newItemResult = sqlSelect('usersItems','amount',"username='test' and item = '".$newItem."' and Level = '".$level."'","amount")[0];
  if($newItemResult==null){//if the user has no item of that sort
    sqlInsert("usersItems","test",$newItem,"1",$level);
  }
  else{ //if the user has at least 0 newItem already (no need to create entry, just +1)
    $newItemAmount = $newItemResult['amount']+1;
    sqlUpdate("usersItems", "username='test' and item = '".$newItem."' and Level = '".$level."'",'amount', $newItemAmount);
  }
}

//needs to implement user as a variable




?>
