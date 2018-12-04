// A class that stores information
//relative to which cards have been clicked and how many attempts have been made
//
//cardValue constructor
function CardValue(){
  this.firstValue = undefined;
  this.secondValue = undefined;
  this.clickedAgain = false;
  this.attemps = 0;
}

//updateValue();
//
//when the mouse is clicked, this gives the lastCardValue value to this.firstValue or this.secondValue
CardValue.prototype.updateValue = function(){
  if(this.firstValue === undefined){
    this.firstValue = lastCardValue;
  }
  else if(this.secondValue === undefined){
    this.secondValue = lastCardValue;
  }
  else{
    this.clickedAgain = true;
  }
}

//compareValues();
//
//compares both values and returns true if they are equal
CardValue.prototype.compareValues = function(){
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
CardValue.prototype.reset = function(){
  this.firstValue = undefined;
  this.secondValue = undefined;
  this.clickedAgain = false;
  this.attemps +=1;
}
