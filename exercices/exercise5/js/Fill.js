//fill
//
//A class to define how the fill behaves
//the fill color is modified at the same time as the score of the paddles
function Fill(red,green,blue,colorModifier){
  this.red = red;
  this.green = green;
  this.blue = blue;
  this.colorModifier = colorModifier;
}

//This makes the fill color more cyan
Fill.prototype.leftScored = function(){
  this.red = constrain(this.red - this.colorModifier, colorMinValue, colorMaxValue);
  this.blue = constrain(this.blue + this.colorModifier, colorMinValue, colorMaxValue);
}

//This makes the fill color more yellow
Fill.prototype.rightScored = function(){
  this.red = constrain(this.red + this.colorModifier, colorMinValue, colorMaxValue);
  this.blue = constrain(this.blue - this.colorModifier, colorMinValue, colorMaxValue);
}

//This makes the fill color change as the game progresses
Fill.prototype.bgProgress = function(){
  //This makes the fill color greener with time
  this.green = constrain(this.green + this.colorModifier, colorMinValue, colorMaxValue);
  //this makes the fill color redder as the LeftPaddle scores points
  this.red = bgColorBaseValue + leftPaddle.score;
  // this makes the fill color bluer as the RightPaddle scores points
  this.blue = bgColorBaseValue + rightPaddle.score;
}
