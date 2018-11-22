// A class that stores information
//relative to which cards have been clicked and how many attempts have been made
//
//cardValue constructor
function CardValue(){
  this.firstValue = undefined;
  this.secondValue = undefined;
  this.attemps = 0;
}

//updateValue();
//
//when the mouse is clicked, this gives the lastCardValue value to this.firstValue or this.secondValue
CardValue.prototype.updateValue = function(){
  if(this.firstValue === undefined){
    this.firstValue = lastCardValue;
  }
  else{
    this.secondValue = lastCardValue;
  }
}

//compareValues();
//
//compares both values and returns true if they are equal
cardValue.prototype.compareValues = function(){
    if(this.secondValue === this.firstValue){
      return true;
  }
  else{
    return false;
  }
}

//reset();
//
//resets both values to undefined and updates the number of attempts
cardValue.prototype.reset = function(){
  this.firstValue = undefined;
  this.secondValue = undefined;
  this.attemps +=1;
}
